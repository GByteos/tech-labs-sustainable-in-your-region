import { paginate } from "blitz"
import { resolver } from "@blitzjs/rpc"
import db from "db"

export default resolver.pipe(async ({ where, orderBy, skip = 0, take = 4 }) => {
  // TODO: in multi-tenant app, you must add validation to ensure correct tenant
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
  console.log(offers)
  return { offers, nextPage, hasMore, count }
})

// export default resolver.pipe(async ({  orderBy, skip = 0, take = 4, id }) => {
//   // TODO: in multi-tenant app, you must add validation to ensure correct tenant
//   const { items: offers } = await db.offer.findMany({
//     //  where,
// orderBy,
// take,
// include: {
//   offerTags: {
//     select: {
//       id: true,
//       name: true,
//     },
//   },
// },
//   })
//   console.log(offers)

//   return {
//     offers,
//   }
// })
