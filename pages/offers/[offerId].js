import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import getOffer from "app/offers/queries/getOffer"
import deleteOffer from "app/offers/mutations/deleteOffer"
import DisplayOffer from "app/offers/components/DisplayOffer"

export const Offer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")
  const [deleteOfferMutation] = useMutation(deleteOffer)
  const [offer] = useQuery(getOffer, {
    id: offerId,
  })
  //  function LOGO (){

  //   if (![offer.logo]) {
  //     return  <Image src={[offer.logo]} alt="Offer Logo" width="150px" height="150px"/>
  //     console.log(![offer.logo])
  //   }
  //   else  {
  //     return  <Image src={YL}  alt="Offer Logo" width="150px" height="150px"/>
  //   }
  // }

  return (
    <div>
      <div>
        <br />
        <br />
        <h3> Your offer: {offer.name}</h3>
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
        <br /> <br />
        <h3>It will look like this:</h3>
        <DisplayOffer offer={offer} />
      </div>
    </div>
  )
}

const ShowOfferPage = () => {
  return (
    // in the title should appear the offer id, no idea how to do that
    // <Layout title={offer}>
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
