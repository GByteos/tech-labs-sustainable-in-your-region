import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const UpdateOfferTag = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateOfferTag),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offerTag = await db.offerTag.update({
      where: {
        id,
      },
      data,
    })
    return offerTag
  }
)
