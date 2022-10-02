import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { OfferForm, FORM_ERROR } from "app/offers/components/OfferForm"
import axios from "axios"
import { getAntiCSRFToken } from "@blitzjs/auth"
import { CreateOffer } from "app/offers/validation"

const NewOfferPage = () => {
  const router = useRouter()
  return (
    <Layout title={"Create New Offer"}>
      <h1 className="newoffer">Create New Offer</h1>

      <OfferForm
        // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        schema={CreateOffer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const formData = new FormData()

            // put all fields onto the formData for multer
            formData.append("logo", values.logo[0])
            values.name ? formData.append("name", values.name) : ""
            
            values.OfferType ? formData.append("OfferType", values.OfferType) : ""

            values.description ? formData.append("description", values.description) : ""

            values.openingTimes ? formData.append
            ("openingTimes", values.openingTimes) : ""

            values.date ? formData.append("date", values.date) : ""

            values.link ? formData.append("link", values.link) : ""

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

            const response = await axios.post("/api/createOffer", formData, config)
            if (response.data.data === "sucess") {
              const offer = response.data.offer

              router.push(
                Routes.ShowOfferPage({
                  offerId: offer.id,
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

      <p>
        <Link href={Routes.OffersPage()}>
          <a >Offers</a>
        </Link>
      </p>
    </Layout>
  )
}

NewOfferPage.authenticate = true
export default NewOfferPage
