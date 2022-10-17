import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 100 }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
  const {
    items: user,
   
  } = await paginate({
    skip,
    take,
    count: () =>
      db.User.count({
        where,
      }),
    query: (paginateArgs) => db.User.findMany({ ...paginateArgs, where, orderBy }),
  })
  return {
    user,
   
  }
})
