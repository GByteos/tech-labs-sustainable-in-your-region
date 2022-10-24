import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import getOffer from "app/offers/queries/getOffer"
import deleteOffer from "app/offers/mutations/deleteOffer"
import { useSession } from "@blitzjs/auth"
import YL from "public/yourlogo.png"
import Image from "next/image"

function Logo({ offer }) {
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
  const router = useRouter()
  const [deleteOfferMutation] = useMutation(deleteOffer)
  const session = useSession()

  if (offer.authorId === session.userId || session.role === "ADMIN")
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
              router.back()
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
function OpTimeDate({ offer }) {
  if (offer.offerType == "EVENT") return <h4>Date and time</h4>
  else return <h4>Opening times</h4>
}
export const Offer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")

  const [offer] = useQuery(getOffer, {
    id: offerId,
  })

  const date = String(offer.date).split(" ", 4)

  return (
    <div>
      {/* <pre>{JSON.stringify(offer, "", 2)}</pre> */}
      <div>
        <br />
        <section className="TagSection">
          {" "}
          {offer.offerTags.map((tagname) => (
            <p key={tagname.id} className="Tags">
              {" "}
              {tagname.name}{" "}
            </p>
          ))}
        </section>
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
        <br />
        <section className="offerInfo">
          <div>
            <OpTimeDate offer={offer} />
            <div>
              <br />
              {String(date)}
              <br />
              {offer.openingTimes}
            </div>
          </div>
          <div>
            <h4>Location</h4>
            <div>
              <br />
              <a href={`http://maps.google.com/?q=${offer.street} ${offer.zip} ${offer.city}`}>
                {offer.street} <br />
                {offer.zip} {offer.city}
              </a>
            </div>
          </div>
          <div>
            <h4>Contact</h4>
            <div>
              <br />
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
     
        <Offer />
      
    </Layout>
  )
}

//ShowOfferPage.authenticate = true

// ShowOfferPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowOfferPage
