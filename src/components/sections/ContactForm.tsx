"use client";

import { Button } from "@/components/ui/Button";
import { contactSchema, type ContactFormData } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { ContactFormVideo } from "./contact-form/ContactFormVideo";
import {
  CONTACT_FORM_PHONE,
  CONTACT_FORM_PHONE_HREF,
  CONTACT_FORM_SUBTITLE,
  CONTACT_FORM_TELEGRAM_HREF,
  CONTACT_FORM_TITLE,
  CONTACT_FORM_WHATSAPP_HREF,
} from "./contact-form/constants";

const inputClassName =
  "w-full rounded-md border border-dashed border-silver/70 bg-cream px-4 py-3 font-body text-sm text-graphite outline-none transition-colors focus-visible:border-teal";

export default function ContactForm() {
  const [submitState, setSubmitState] = useState<"idle" | "loading" | "success" | "error">(
    "idle",
  );

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      phone: "",
      who: "self",
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setSubmitState("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error("submit failed");

      setSubmitState("success");
      reset();
    } catch {
      setSubmitState("error");
    }
  };

  return (
    <section
      id="contact"
      className="bg-cream py-20 md:py-24 lg:py-28"
      aria-labelledby="contact-title"
    >
      <div className="mx-auto grid w-full max-w-[1280px] gap-10 px-6 md:grid-cols-2 md:items-start md:gap-12 md:px-10 lg:px-14">
        <div>
          <h2
            id="contact-title"
            className="font-display text-display-sm text-graphite md:text-[clamp(32px,3.2vw,46px)] md:leading-[1.12]"
          >
            {CONTACT_FORM_TITLE}
          </h2>
          <p className="mt-4 font-body text-sm text-gray md:text-base">{CONTACT_FORM_SUBTITLE}</p>

          <form className="mt-8 space-y-5" onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label htmlFor="contact-name" className="font-body text-xs text-gray">
                  Имя
                </label>
                <input
                  id="contact-name"
                  type="text"
                  autoComplete="name"
                  className={cn(inputClassName, "mt-2")}
                  {...register("name")}
                />
                {errors.name ? (
                  <p className="mt-1 font-body text-xs text-gray">{errors.name.message}</p>
                ) : null}
              </div>

              <div>
                <label htmlFor="contact-phone" className="font-body text-xs text-gray">
                  Телефон
                </label>
                <input
                  id="contact-phone"
                  type="tel"
                  autoComplete="tel"
                  className={cn(inputClassName, "mt-2")}
                  {...register("phone")}
                />
                {errors.phone ? (
                  <p className="mt-1 font-body text-xs text-gray">{errors.phone.message}</p>
                ) : null}
              </div>
            </div>

            <fieldset>
              <legend className="sr-only">Для кого нужна помощь</legend>
              <div className="flex flex-wrap items-center gap-4 font-body text-sm text-graphite">
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input type="radio" value="self" className="accent-teal" {...register("who")} />
                  За себя
                </label>
                <span className="text-gray" aria-hidden>
                  ·
                </span>
                <label className="inline-flex cursor-pointer items-center gap-2">
                  <input
                    type="radio"
                    value="relative"
                    className="accent-teal"
                    {...register("who")}
                  />
                  За близкого
                </label>
              </div>
            </fieldset>

            <Controller
              name="consent"
              control={control}
              render={({ field }) => (
                <label className="flex cursor-pointer items-start gap-3">
                  <input
                    type="checkbox"
                    className="mt-0.5 accent-teal"
                    checked={field.value === true}
                    onChange={(event) => field.onChange(event.target.checked ? true : undefined)}
                    onBlur={field.onBlur}
                    ref={field.ref}
                  />
                  <span className="font-body text-xs leading-relaxed text-gray">
                    Согласен на обработку персональных данных
                  </span>
                </label>
              )}
            />
            {errors.consent ? (
              <p className="font-body text-xs text-gray">{errors.consent.message}</p>
            ) : null}

            <Button
              type="submit"
              disabled={!isValid || submitState === "loading"}
              className="h-12 w-full rounded-xl bg-graphite text-base text-cream hover:bg-black disabled:cursor-not-allowed disabled:opacity-50"
            >
              {submitState === "loading" ? "Отправляем..." : "Отправить"}
            </Button>

            {submitState === "success" ? (
              <p className="font-body text-sm text-graphite">
                Спасибо, мы свяжемся с вами в ближайшее время
              </p>
            ) : null}
            {submitState === "error" ? (
              <p className="font-body text-sm text-gray">
                Не удалось отправить заявку, попробуйте позже или позвоните нам
              </p>
            ) : null}
          </form>

          <p className="mt-10 font-display text-sm italic text-graphite md:text-base">
            <Link href={CONTACT_FORM_PHONE_HREF} className="hover:text-teal">
              {CONTACT_FORM_PHONE}
            </Link>
            <span className="mx-2 text-gray" aria-hidden>
              ·
            </span>
            <Link href={CONTACT_FORM_WHATSAPP_HREF} className="hover:text-teal">
              WhatsApp
            </Link>
            <span className="mx-2 text-gray" aria-hidden>
              ·
            </span>
            <Link href={CONTACT_FORM_TELEGRAM_HREF} className="hover:text-teal">
              Telegram
            </Link>
          </p>
        </div>

        <ContactFormVideo className="md:sticky md:top-24" />
      </div>
    </section>
  );
}
