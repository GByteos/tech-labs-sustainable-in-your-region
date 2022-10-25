import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { unlink } from "node:fs/promises"
import path from "path"
import { NotFoundError } from "blitz"

const DeleteOffer = z.object({
  id: z.number(),
})
export default resolver.pipe(
  resolver.zod(DeleteOffer),
  resolver.authorize(),
  async ({ id }, { session }) => {
    const offer = await db.offer.findFirst({
      where: {
        id,
      },
    })

    let deleted

    if (
      offer &&
      (session.userId === offer.authorId || session.$isAuthorized(["ADMIN", "MODERATOR"]))
    ) {
      deleted = await db.offer.deleteMany({
        where: {
          id,
        },
      })
      // remove linked files
      if (deleted.count !== 0) {
        try {
          await unlink(path.resolve(process.env.IMAGE_UPLOAD_URL, offer.logo))
        } catch (error) {
          if (error instanceof TypeError) {
            // offer.logo was empty
          } else if (error instanceof NotFoundError) {
            // File was not found
          } else {
            throw error
          }
        }
      }
    } else {
      throw new Error("You are not authorized to delete this entry or the entry was not found.")
    }

    return deleted
  }
)
