import Link from "next/link"
import { Routes } from "@blitzjs/next"
import UserForm from "./UserForm"

function DisplayUser({ user }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}

  return (
    <>
      <article>
        <div></div>
        <div>
          <p>
            <Link href={Routes.MyOffersPage({ userid: user.id })}>
              <a>
                ID: {user.id} - Username: {user.name} - Role: {user.role}{" "}
              </a>
            </Link>
            - email: <a href={`mailto: ${user.email}`}>{user.email}</a>
          </p>
          <UserForm />
        </div>
      </article>
    </>
  )
}

export default DisplayUser
