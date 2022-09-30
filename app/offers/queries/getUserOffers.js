import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }, { session }) => {
    // Add current user to the querry to get only relevatn offers.
    // In theory, this could also be done on client side
    where = { ...where, authorId: session.userId }
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
      query: (paginateArgs) => db.offer.findMany({ ...paginateArgs, where, orderBy }),
    })
    return {
      offers,
      nextPage,
      hasMore,
      count,
    }
  }
)
