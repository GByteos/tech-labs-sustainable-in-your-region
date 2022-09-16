import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const UpdateOfferType = z.object({
  id: z.number(),
  name: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateOfferType),
  resolver.authorize(),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offerType = await db.offerType.update({
      where: {
        id,
      },
      data,
    })
    return offerType
  }
)
