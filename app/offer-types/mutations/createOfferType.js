import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const CreateOfferType = z.object({
  name: z.string(),
})
export default resolver.pipe(resolver.zod(CreateOfferType), resolver.authorize(), async (input) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const offerType = await db.offerType.create({
    data: input,
  })
  return offerType
})
