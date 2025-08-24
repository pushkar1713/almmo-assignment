import { z } from "zod";

export const clickTrackingSchema = z.object({
  affiliateId: z.string(),
  campaignId: z.string(),
  clickId: z.string(),
});

export const postBackSchema = z.object({
  affiliateId: z.string(),
  clickId: z.string(),
  amount: z.coerce.number().nonnegative(),
  currency: z
    .string()
    .length(3)
    .transform((s) => s.toUpperCase()),
});
