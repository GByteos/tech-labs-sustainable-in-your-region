import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async (category) => {
  const where = category
    ? {
        category: {
          has: category,
        },
      }
    : {}

  const offerTags = await db.offerTag.findMany({
    where: where,
    select: {
      name: true,
      category: true,
    },
  })
  if (!offerTags) throw new NotFoundError()
  return offerTags
})
