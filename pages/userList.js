import { Suspense } from "react"
import Head from "next/head"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getUsers from "app/core/queries/getUsers"
import DisplayUser from "app/core/components/DisplayUser"
const ITEMS_PER_PAGE = 20


export const UserList = () => {
  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ user, hasMore }] = usePaginatedQuery(getUsers, {
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })
  console.log(user)
  return (
    <div>
      <ul className="DisplayList">
        {user.map((user) => (
          <li key={user.id}>
            <DisplayUser user={user} />
          
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const userPage = () => {
  return (
    <Layout>
      <Head>
        <title>Users</title>
      </Head>

      <Suspense fallback={<div>Loading...</div>}>
        <h2>Users</h2>
        <UserList />
      </Suspense>
    </Layout>
  )
}

export default userPage
