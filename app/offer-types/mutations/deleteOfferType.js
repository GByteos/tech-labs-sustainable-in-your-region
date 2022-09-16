import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const DeleteOfferType = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteOfferType),
  resolver.authorize(),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offerType = await db.offerType.deleteMany({
      where: {
        id,
      },
    })
    return offerType
  }
)
