import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }, { session }) => {
    if (!session.$isAuthorized(["ADMIN", "MODERATOR"]) && !session.userId === where.id) {
      where = {
        ...where,
        offerState: "REVIEWED",
      }
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
    return {
      offers,
      nextPage,
      hasMore,
      count,
    }
  }
)
