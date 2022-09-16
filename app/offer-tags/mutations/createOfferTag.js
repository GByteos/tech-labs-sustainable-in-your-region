import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const CreateOfferTag = z.object({
  name: z.string(),
})
export default resolver.pipe(resolver.zod(CreateOfferTag), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const offerTag = await db.offerTag.create({
    data: input,
  })
  return offerTag
})
