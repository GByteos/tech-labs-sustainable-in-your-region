import { number, z } from "zod"

const offerContent = z.object({
  name: z.string(),
  description: z.string(),
  link: z.string().url(),
  offerType: z.string(),
  tags: z.array(
    z.object({
      name: z.string(),
      id: z.number(),
    })
  ),
  openingTimes: z.string().optional(),
  email: z.string().optional(),
  street: z.string().optional(),
  zip: z.string().optional(),
  city: z.string().optional(),
  tel: z.string().optional(),
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
