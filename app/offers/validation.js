import { number, z } from "zod"

const offerContent = z.object({
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

export const CreateOffer = offerContent

export const UpdateOffer = offerContent.extend({
  id: z.string().transform((val, ctx) => {
    const parsedInt = parseInt(val)
    if (isNaN(parsedInt)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Nat a number",
      })
      return z.NEVER
    }
    return parsedInt
  }),
})
