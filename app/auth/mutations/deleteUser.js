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
    await db.user.delete({
      where: {
        id,
      },
    })
  }
)
