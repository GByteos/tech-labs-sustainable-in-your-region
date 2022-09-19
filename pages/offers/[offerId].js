import { Suspense } from "react";
import { Routes } from "@blitzjs/next";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import { useQuery, useMutation } from "@blitzjs/rpc";
import { useParam } from "@blitzjs/next";
import Layout from "app/core/layouts/Layout";
import getOffer from "app/offers/queries/getOffer";
import deleteOffer from "app/offers/mutations/deleteOffer";
import HEADER from "pages/components/Header"

export const Offer = () => {
  const router = useRouter();
  const offerId = useParam("offerId", "number");
  const [deleteOfferMutation] = useMutation(deleteOffer);
  const [offer] = useQuery(getOffer, {
    id: offerId,
  });
  return (
    <>
    <HEADER/>
      <Head>
        <title>Offer {offer.id}</title>
      </Head>
    
      <div>
        <h1>Offer {offer.id}</h1>
        <pre>{JSON.stringify(offer, null, 2)}</pre>

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
              });
              router.push(Routes.OffersPage());
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
  );
};

const ShowOfferPage = () => {
  return (
    <div>
      <p>
        <Link href={Routes.OffersPage()}>
          <a>Offers</a>
        </Link>
      </p>

      <Suspense fallback={<div>Loading...</div>}>
        <Offer />
      </Suspense>
    </div>
  );
};

ShowOfferPage.authenticate = true;

ShowOfferPage.getLayout = (page) => <Layout>{page}</Layout>;

export default ShowOfferPage;
