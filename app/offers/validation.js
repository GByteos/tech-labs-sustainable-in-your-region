import { z } from "zod"

export const CreateOffer = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string(),
  offerType: z.string(),
  openingTimes: z.string(),
  date: z.string(),
})
