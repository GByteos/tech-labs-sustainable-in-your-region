import { Suspense } from "react"
import { Routes } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { useRouter } from "next/router"
import { useQuery } from "@blitzjs/rpc"
import { useParam } from "@blitzjs/next"
import Layout from "app/core/layouts/Layout"
import getOffer from "app/offers/queries/getOffer"
import { OfferForm, FORM_ERROR } from "app/offers/components/OfferForm"
import axios from "axios"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { UpdateOffer } from "app/offers/validation"

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

  console.log(offer)

  return (
    <Layout title={"Edit Offer"}>
      <section>
        <h1 className="editoffer">Edit Offer {offer.name}</h1>

        <OfferForm
          // TODO: activate schema
          // schema={UpdateOffer}
          initialValues={offer}
          onSubmit={async (values) => {
            try {
              const formData = new FormData()

              // put all fields onto the formData for multer
              formData.append("id", offer.id)
              if (values.logo) formData.append("logo", values.logo[0])
              if (values.name) formData.append("name", values.name)
              if (values.offerType) formData.append("offerType", values.offerType)
              if (values.description) formData.append("description", values.description)
              if (values.openingTimes) formData.append("openingTimes", values.openingTimes)
              if (values.date) formData.append("date", values.date)
              if (values.link) formData.append("link", values.link)
              if (values.email) formData.append("email", values.email)
              if (values.street) formData.append("street", values.street)
              if (values.zip) formData.append("zip", values.zip)
              if (values.city) formData.append("city", values.city)
              if (values.tel) formData.append("tel", values.tel)
              if (values.offerTags) formData.append("offerTags", JSON.stringify(values.offerTags))

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
                console.error("Uh an error occured...")
                console.log(response.data)
                throw new Error("Creaition failed on server side")
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

        <p>
          <Link href={Routes.OffersPage()}>
            <a>Offers</a>
          </Link>
        </p>
      </section>
    </Layout>
  )
}

const EditOfferPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <EditOffer />
      </Suspense>
    </div>
  )
}

EditOfferPage.authenticate = true

EditOfferPage.getLayout = (page) => <Layout>{page}</Layout>

export default EditOfferPage
