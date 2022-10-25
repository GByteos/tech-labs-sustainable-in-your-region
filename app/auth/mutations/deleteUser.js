import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const DeletUser = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeletUser),
  resolver.authorize(["ADMIN"]),
  async ({ id }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    await db.user.delete({
      where: {
        id,
      },
    })
  }
)
