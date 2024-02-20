import { z } from "zod";

export function isEmail(email: string): boolean {
  const state = z.string().email("Invalid email provided").safeParse(email);
  return state.success;
}

export function isUrl(url: string): boolean {
  const state = z.string().url().safeParse(url);
  return state.success;
}

export const file_base64_validator = z.object({
  name: z.string(),
  base64: z
    .string()
    .regex(
      /^(?:[a-zA-Z0-9+\/]{4})*(?:|[a-zA-Z0-9+\/]{3}=|[a-zA-Z0-9+\/]{2}==|[a-zA-Z0-9+\/]===)$/,
    ),
});

export const addressSchema = z.object({
  address: z.string(),
  state: z.string(),
  city: z.string(),
  zipCode: z.string(),
  selectedCountry: z.string(),
});

export const phoneNumberSchema = z.object({
  phone_country: z.any(), // TODO: Maybe add a validator for the CountryI interface
  phone_number: z.string(),
});

export const businessFormSchema = z.object({
  business_email: z.string().email(),
  business_name: z.string().min(3, { message: "Business name is too short" }),
  business_structure: z.string(),
});

export const password_validator = z
  .string()
  .min(8)
  .refine((value) => /[A-Z]/.test(value), {
    message: "At least one UPPERCASE letter",
  })
  .refine(
    (value) => /[!@#$%^&*?]/.test(value),
    "One unique character (e.g: !@#$%^&*?)",
  )
  .refine((value) => /\d/.test(value), "At least one number");
