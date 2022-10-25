import { NotFoundError } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { z } from "zod"
const GetOffer = z.object({
  // This accepts type of undefined, but is required at runtime
  id: z.number().optional().refine(Boolean, "Required"),
})
export default resolver.pipe(resolver.zod(GetOffer), async ({ id }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const offer = await db.offer.findFirst({
    where: {
      id,
      offerState: "REVIEWED",
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
