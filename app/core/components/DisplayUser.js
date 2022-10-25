import Link from "next/link"
import { Routes } from "@blitzjs/next"
import UserForm from "./UserForm"

function DisplayUser({ user }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}

  return (
    <>
      <article>
        <div className="UserList">
          <div className="UserList1">
            <p>
              <Link href={Routes.MyOffersPage({ userid: user.id })}>
                <a>
                  ID: {user.id} - Username: {user.name} - Role: {user.role}{" "}
                </a>
              </Link>
              - email: <a href={`mailto: ${user.email}`}>{user.email}</a>
            </p>
          </div>
          <div className="UserList2">
            <UserForm user={user} />
          </div>
        </div>
      </article>
    </>
  )
}

export default DisplayUser
