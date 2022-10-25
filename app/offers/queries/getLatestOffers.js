import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 4 }) => {
  where = {
    ...where,
    offerState: "REVIEWED",
  }

  const {
    items: offers,
    hasMore,
    nextPage,
    count,
  } = await paginate({
    skip,
    take,
    count: () =>
      db.offer.count({
        where,
      }),
    query: (paginateArgs) =>
      db.offer.findMany({
        ...paginateArgs,
        where,
        orderBy,
        include: {
          offerTags: {
            select: {
              id: true,
              name: true,
            },
          },
        },
      }),
  })

  return { offers, nextPage, hasMore, count }
})
