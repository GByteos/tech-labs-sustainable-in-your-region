import Image from "next/image"
import Link from "next/link"
import YL from "public/yourlogo.png"
import { Routes } from "@blitzjs/next"
import Truncate from "react-truncate"
import getPublicTags from "app/offer-tags/queries/getPublicTags"

function Logo({ offer }) {
  console.log({ offer })
  if (!offer.logo) {
    return (
      <>
        <Image className="displaylogo" src={YL} alt="Offer Logo" width="150px" height="150px" />
      </>
    )
  } else
    return (
      <>
        <Image
          className="displaylogo"
          src={"/api/getImage?imageId=" + offer.logo}
          alt="Offer Logo"
          width="150px"
          height="150px"
        />
      </>
    )
}

function DisplayUser({ user }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}

  return (
    <>
   
      <article >
        <div>
      
        </div>

        {/*  */}
        <div >
          {/* <Link
            href={Routes.MyOffersPage({
              offerId: offer.id,
            })}
          > */}
          {/* <a>
              <h4>{user.name}</h4>
            </a> */}
          {/* </Link> */}
          <h2> </h2>
          <p>ID: {user.id} - {user.role} - {user.email}</p>
        </div>
       
      </article>
    </>
  )
}

export default DisplayUser
