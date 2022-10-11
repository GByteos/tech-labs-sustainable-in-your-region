import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import getOffer from "app/offers/queries/getOffer"
import deleteOffer from "app/offers/mutations/deleteOffer"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import YL from "public/yourlogo.png"
import Image from "next/image"

function Logo({ offer }) {
  // console.log({ offer })
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
function EditDelete({ offer }) {
  const [deleteOfferMutation] = useMutation(deleteOffer)
  const currentUser = useCurrentUser()
  const currentUserID = currentUser.id
  console.log(currentUser.id)

  if (currentUser && offer.authorId == currentUserID)
    return (
      <div>
        <Link
          href={Routes.EditOfferPage({
            offerId: offer.id,
          })}
        >
          <a>Edit</a>
        </Link>
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("This will be deleted")) {
              await deleteOfferMutation({
                id: offer.id,
              })
              router.push(Routes.OffersPage())
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    )
}

export const Offer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")

  const [offer] = useQuery(getOffer, {
    id: offerId,
  })

  return (
    <div>
      {/* <pre>{JSON.stringify(offer, "", 2)}</pre> */}
      <div>
        <br />
        <div className="offerTitle">
          <Logo offer={offer} />
          <div>
            <h5>{offer.offerType}</h5>
            <Link href={offer.link}>
              <a>
                <h2> {offer.name}</h2>
              </a>
            </Link>
          </div>
        </div>
        <br />
        <section className="offerDescription">{offer.description}</section>
        <br />
        <section className="offerInfo">
          <div>
            <h3>Opening Times</h3>
            {offer.openingTimes}
          </div>
          <div>
            <h3>Location</h3>
            <div>
              {offer.street} <br />
              {offer.zip} {offer.city}
            </div>
          </div>
          <div>
            <h3>Contact</h3>
            <div>
              Email:{" "}
              <a href={`mailto: ${offer.email}`}>
                {offer.email}
                <br />
              </a>
              Phone: {offer.tel}
            </div>
          </div>
        </section>
      </div>
      <br />
      <br />
      <EditDelete offer={offer} />
    </div>
  )
}

const ShowOfferPage = () => {
  return (
    <Layout>
      <main>
        {/* <p>
          <Link href={Routes.MyOffersPage()}>
            <a>My Offers</a>
          </Link>
        </p> */}

        <Suspense fallback={<div>Loading...</div>}>
          <Offer />
        </Suspense>
      </main>
    </Layout>
  )
}

ShowOfferPage.authenticate = true

// ShowOfferPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowOfferPage
