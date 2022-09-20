import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import getOffer from "app/offers/queries/getOffer"
import deleteOffer from "app/offers/mutations/deleteOffer"

export const Offer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")
  const [deleteOfferMutation] = useMutation(deleteOffer)
  const [offer] = useQuery(getOffer, {
    id: offerId,
  })
  return (
    <>
      {/* <Head>
        <title>Offer {offer.id}</title>
      </Head> */}

      <div>
        <h1>Offer {offer.name}</h1>

        <article className="eintrag">
          <a href="{offer.link}">
            <img src="{offer.logo}" alt="Offer Logo" />
          </a>
          <div className="para_main">
            <h3>{offer.name}</h3>
            <p>{offer.description}</p>
          </div>
          <div className="para_main info">
            <ul>
              <li>{offer.openingTimes}</li>
              {/* <li>Sa: 8-13 Uhr</li>
							<br />
							<li>Wolfmühle 1</li>
							<li>85661 Forstinning</li>
							<li>08121 / 3334</li> */}
            </ul>
          </div>
        </article>
        <pre>{JSON.stringify(offer, "", 2)}</pre>
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
    </>
  )
}

const ShowOfferPage = () => {
  return (
    // in the title should appear the offer id, no idea how to do that
    // <Layout title={` Offer ${offer.id}`}>
    <Layout>
      <main>
        <p>
          <Link href={Routes.OffersPage()}>
            <a>Offers</a>
          </Link>
        </p>

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
