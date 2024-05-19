import { z } from "zod";

export const shipmentSchema = z.object({
  name: z.string().min(2, {
    message: "Please complete your name",
  }),
  email: z.string().email().min(2, {
    message: "Please complete your email",
  }),
  phone: z.string().min(2, {
    message: "Please complete your phone number",
  }),
  address: z.string().min(2, {
    message: "Please complete your address",
  }),
  city: z.string().min(2, {
    message: "Please complete your city",
  }),
  country: z.string().min(2, {
    message: "Please complete your country",
  }),
  postalCode: z.string().min(2, {
    message: "Please complete your postal code",
  }),
});
