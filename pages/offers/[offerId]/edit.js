import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout";
import getOffer from "app/offers/queries/getOffer";
import updateOffer from "app/offers/mutations/updateOffer";
import { OfferForm, FORM_ERROR } from "app/offers/components/OfferForm";

export const EditOffer = () => {
  const router = useRouter();
  const offerId = useParam("offerId", "number");
  const [offer, { setQueryData }] = useQuery(
    getOffer,
    {
      id: offerId,
    },
    {
      // This ensures the query never refreshes and overwrites the form data while the user is editing.
      staleTime: Infinity,
    }
  );
  const [updateOfferMutation] = useMutation(updateOffer);
  return (
    <>
      <Head>
        <title>Edit Offer {offer.id}</title>
      </Head>

      <div>
        <h1>Edit Offer {offer.id}</h1>
        <pre>{JSON.stringify(offer, null, 2)}</pre>

        <OfferForm
          submitText="Update Offer" // TODO use a zod schema for form validation
          //  - Tip: extract mutation's schema into a shared `validations.ts` file and
          //         then import and use it here
          // schema={UpdateOffer}
          initialValues={offer}
          onSubmit={async (values) => {
            try {
              const updated = await updateOfferMutation({
                id: offer.id,
                ...values,
              });
              await setQueryData(updated);
              router.push(
                Routes.ShowOfferPage({
                  offerId: updated.id,
                })
              );
            } catch (error) {
              console.error(error);
              return {
                [FORM_ERROR]: error.toString(),
              };
            }
          }}
        />
      </div>
    </>
  );
};

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
  );
};

EditOfferPage.authenticate = true;

EditOfferPage.getLayout = (page) => <Layout>{page}</Layout>;

export default EditOfferPage;
