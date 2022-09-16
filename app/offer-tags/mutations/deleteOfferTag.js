import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const DeleteOfferTag = z.object({
  id: z.number(),
})
export default resolver.pipe(resolver.zod(DeleteOfferTag), resolver.authorize(), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const offerTag = await db.offerTag.deleteMany({
    where: {
      id,
    },
  })
  return offerTag
})
