import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import getOffer from "app/offers/queries/getOffer"
import updateOffer from "app/offers/mutations/updateOffer"
import { OfferForm, FORM_ERROR } from "app/offers/components/OfferForm"
import axios from "axios"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { CreateOffer } from "app/offers/validation"

export const EditOffer = () => {
  const router = useRouter()
  const offerId = useParam("offerId", "number")
  const [offer, { setQueryData }] = useQuery(
    getOffer,
    {
      id: offerId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  )
  const [updateOfferMutation] = useMutation(updateOffer)
  return (
    <>
      <Head>
        <title>Edit Offer {offer.id}</title>
      </Head>

      <div>
        <h1>Edit Offer {offer.id}</h1>
        <pre>{JSON.stringify(offer, null, 2)}</pre>

        <OfferForm
          //submitText="Update Offer" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOffer}
          initialValues={offer}
          onSubmit={async (values) => {
            try {
              /*
              const updated = await updateOfferMutation({
                id: offer.id,
                ...values,
              });*/

              const formData = new FormData()

              // put all fields onto the formData for multer
              formData.append("id", offer.id)
              if (values.logo[0]) formData.append("logo", values.logo[0])
              if (values.name) formData.append("name", values.name)
              if (values.offerType) formData.append("offerType", values.offerType)
              if (values.description) formData.append("description", values.description)
              if (values.openingTimes) formData.append("openingTimes", values.openingTimes)
              if (values.date) formData.append("date", values.date)
              if (values.link) formData.append("link", values.link)

              // is needed, to identify and verify the user on server side
              const antiCSRFToken = getAntiCSRFToken()

              const config = {
                credentials: "include",
                headers: { "content-type": "multipart/form-data", "anti-csrf": antiCSRFToken },
                onUploadProgress: (event) => {
                  // TODO: add a progres bar or similar here
                  console.log(`Current progress:`, Math.round((event.loaded * 100) / event.total))
                },
              }

              const response = await axios.post("/api/updateOffer", formData, config)
              if (response.data.data === "sucess") {
                const updatedOffer = response.data.offer

                await setQueryData(updatedOffer)
                router.push(
                  Routes.ShowOfferPage({
                    offerId: updatedOffer.id,
                  })
                )
              } else {
                // TODO: add some information, why the data was not accepted
              }
            } catch (error) {
              console.error(error)
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }}
        />
      </div>
    </>
  )
}

const EditOfferPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOffer />
      </Suspense>

      <p>
        <Link href={Routes.OffersPage()}>
          <a>Offers</a>
        </Link>
      </p>
    </div>
  )
}

EditOfferPage.authenticate = true

EditOfferPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOfferPage
