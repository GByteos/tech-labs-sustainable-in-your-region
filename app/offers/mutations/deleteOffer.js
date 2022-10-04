import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { unlink } from "node:fs/promises"
import path from "path"

const DeleteOffer = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteOffer),
  resolver.authorize(),
  async ({ id }, { session }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const offer = await db.offer.findFirst({
      where: {
        id,
      },
    })

    let deleted

    if (offer && session.userId === offer.authorId) {
      deleted = await db.offer.deleteMany({
        where: {
          id,
        },
      })
      // remove linked files
      if (deleted.count !== 0) {
        await unlink(path.resolve(process.env.IMAGE_UPLOAD_URL, offer.logo))
      }
    } else {
      throw new Error("You are not authorized to delete this entry or the entry was not found.")
    }

    return deleted
  }
)
