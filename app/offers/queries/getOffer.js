import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const GetOffer = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetOffer), async ({ id }, { session }) => {
  let offerState

  if (!session.$isAuthorized(["ADMIN", "MODERATOR"]) && !session.userId === id) {
    offerState = {
      offerState: "REVIEWED",
    }
  }
  const offer = await db.offer.findFirst({
    where: {
      id,
      offerState,
    },
    include: {
      offerTags: {
        select: {
          id: true,
          name: true,
        },
      },
    },
  })
  if (!offer) throw new NotFoundError()
  return offer
})
