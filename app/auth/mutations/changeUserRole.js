import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const UpdateOffer = z.object({
  id: z.number(),
  role: z.string(),
})
export default resolver.pipe(
  resolver.zod(UpdateOffer),
  resolver.authorize("ADMIN"),
  async ({ id, ...data }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offer = await db.user.update({
      where: {
        id,
      },
      data,
    })
    return offer
  }
)
