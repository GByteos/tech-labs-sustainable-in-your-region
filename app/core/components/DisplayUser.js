import Image from "next/image"
import Link from "next/link"

import { Routes } from "@blitzjs/next"

function DisplayUser({ user }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}

  return (
    <>
      <article>
        <div></div>

        {/*  */}
        <div>
          <a>
            <p>
              ID: {user.id} - {user.name} - {user.role} - {user.email}
            </p>
          </a>
        </div>
      </article>
    </>
  )
}

export default DisplayUser
