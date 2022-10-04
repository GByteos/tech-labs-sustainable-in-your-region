import { z } from "zod"

export const CreateOffer = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().url(),
  offerType: z.string(),
  openingTimes: z.string().optional(),
  logo: z.any().optional(),
  date: z.preprocess((arg) => {
    if (typeof arg == "string" || arg instanceof Date) return new Date(arg)
  }, z.date().optional()),
})
