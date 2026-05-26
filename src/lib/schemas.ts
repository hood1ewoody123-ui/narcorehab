import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(2, "Введите имя").max(50),
  phone: z.string().regex(/^\+?[78]\d{9,10}$/, "Введите корректный номер"),
  who: z.enum(["self", "relative"]),
  message: z.string().max(300).optional(),
  consent: z.literal(true, { message: "Необходимо согласие" }),
});

export type ContactFormData = z.infer<typeof contactSchema>;
