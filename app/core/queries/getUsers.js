import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"
import { AuthorizationError } from "blitz"
export default resolver.pipe(
 
    async ({ where, orderBy, skip = 0, take = 100 }, context) => {
      context.session.$authorize()
      const userRole = context.session.role
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
  if(userRole!="ADMIN")  throw  new AuthorizationError()
  return {
    user,
   
  }
})
