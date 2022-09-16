import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
export default resolver.pipe(
  resolver.authorize(),
  async ({ where, orderBy, skip = 0, take = 100 }) => {
    // TODO: in multi-tenant app, you must add validation to ensure correct tenant
    const {
      items: offerTags,
      hasMore,
      nextPage,
      count,
    } = await paginate({
      skip,
      take,
      count: () =>
        db.offerTag.count({
          where,
        }),
      query: (paginateArgs) => db.offerTag.findMany({ ...paginateArgs, where, orderBy }),
    })
    return {
      offerTags,
      nextPage,
      hasMore,
      count,
    }
  }
)
