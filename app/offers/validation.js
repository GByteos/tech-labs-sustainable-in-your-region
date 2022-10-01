import { z } from "zod"

export const CreateOffer = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string(),
  logo: z.string().optional(),
})
