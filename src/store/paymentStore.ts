import { shipmentSchema } from "@/schema/shipmentSchema";
import { z } from "zod";
import { create } from "zustand";

export interface PaymentInterface {
  handleSubmit: (values: z.infer<typeof shipmentSchema>) => Promise<void>;
  shipmentData: z.infer<typeof shipmentSchema> | null;
}

export const usePaymentStore = create<PaymentInterface>((set, get) => ({
  shipmentData: null,
  handleSubmit: async (values) => {
    console.log(values, "submiting payment");
  },
}));
