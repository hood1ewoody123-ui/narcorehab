import { contactSchema } from "@/lib/schemas";
import { NextResponse } from "next/server";

const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 10;

type RateEntry = {
  count: number;
  resetAt: number;
};

const rateMap = new Map<string, RateEntry>();

function getClientIp(request: Request) {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0]?.trim() ?? "unknown";
  return request.headers.get("x-real-ip") ?? "unknown";
}

function isRateLimited(ip: string) {
  const now = Date.now();
  const entry = rateMap.get(ip);

  if (!entry || now > entry.resetAt) {
    rateMap.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return false;
  }

  if (entry.count >= RATE_LIMIT_MAX) return true;

  entry.count += 1;
  rateMap.set(ip, entry);
  return false;
}

export async function POST(request: Request) {
  const ip = getClientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json({ ok: false, message: "Слишком много запросов" }, { status: 429 });
  }

  const body = await request.json().catch(() => null);
  const parsed = contactSchema.safeParse(body);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, message: "Проверьте данные формы" }, { status: 400 });
  }

  const webhookUrl = process.env.N8N_WEBHOOK_URL;

  if (webhookUrl) {
    const webhookResponse = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "narcorehab-contact-form",
        submittedAt: new Date().toISOString(),
        ...parsed.data,
      }),
    });

    if (!webhookResponse.ok) {
      return NextResponse.json({ ok: false, message: "Ошибка отправки" }, { status: 502 });
    }
  }

  return NextResponse.json({ ok: true });
}
