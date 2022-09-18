import { Routes } from "@blitzjs/next"
import Link from "next/link"
import { useRouter } from "next/router"
import { useMutation } from "@blitzjs/rpc"
import Layout from "app/core/layouts/Layout"
import createOffer from "app/offers/mutations/createOffer"
import { OfferForm, FORM_ERROR } from "app/offers/components/OfferForm"

const NewOfferPage = () => {
  const router = useRouter()
  const [createOfferMutation] = useMutation(createOffer)
  return (
    <Layout title={"Create New Offer"}>
      <h1 className="newoffer">Create New Offer</h1>

      <OfferForm
        submitText="Create Offer" // TODO use a zod schema for form validation
        //  - Tip: extract mutation's schema into a shared `validations.ts` file and
        //         then import and use it here
        // schema={CreateOffer}
        // initialValues={{}}
        onSubmit={async (values) => {
          try {
            const offer = await createOfferMutation(values)
            router.push(
              Routes.ShowOfferPage({
                offerId: offer.id,
              })
            )
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
          <a className="offerlink">Offers</a>
        </Link>
      </p>
    </Layout>
  )
}

NewOfferPage.authenticate = true
export default NewOfferPage
