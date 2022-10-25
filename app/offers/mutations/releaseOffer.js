import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const ReleaseOffer = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(ReleaseOffer),
  resolver.authorize(["ADMIN", "MODERATOR"]),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offer = await db.offer.update({
      where: {
        id,
      },
      data: {
        offerState: "REVIEWED",
      },
    })
    return offer
  }
)
