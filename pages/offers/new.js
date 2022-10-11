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
      <section>
        <h1 className="newoffer">Create New Offer</h1>

        <OfferForm
          className="OfferForm"
          schema={CreateOffer}
          onSubmit={async (values) => {
            try {
              const formData = new FormData()

              // put all fields onto the formData for multer
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
            <a>Offers</a>
          </Link>
        </p>
      </section>
    </Layout>
  )
}

NewOfferPage.authenticate = true
export default NewOfferPage
