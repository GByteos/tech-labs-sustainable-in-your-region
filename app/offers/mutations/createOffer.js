import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CreateOffer } from "../validation"

export default resolver.pipe(
  resolver.zod(CreateOffer),
  resolver.authorize("admin"),
  (input, { session }) => ({
    ...input,
    author: {
      connect: {
        id: session.userId,
      },
    },
  }),
  async (input) => {
    const offer = await db.offer.create({
      data: input,
    })
    return offer
  }
)
