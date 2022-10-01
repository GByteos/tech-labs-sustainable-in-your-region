import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
import { CreateOffer } from "../validations"

export default resolver.pipe(
  resolver.zod(CreateOffer),
  resolver.authorize(),
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
