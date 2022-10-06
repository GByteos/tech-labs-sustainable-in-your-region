import { Suspense, useState } from "react"
import { Routes, useRouterQuery } from "@blitzjs/next"
import Head from "next/head"
import Link from "next/link"
import { usePaginatedQuery } from "@blitzjs/rpc"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getUserOffers from "app/offers/queries/getUserOffers"
import DisplayOffer from "app/offers/components/DisplayOffer"

const ITEMS_PER_PAGE = 20
export const OffersList = () => {
  const query = useRouterQuery()

  const tags = query.tags ? JSON.parse(decodeURIComponent(query.tags)) : null

  let offerTags = []

  if (tags && tags.length !== 0) {
    for (const tag of tags) {
      offerTags.push({ name: tag })
    }
  }

  console.log(offerTags)

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ offers, hasMore }] = usePaginatedQuery(getUserOffers, {
    where: {
      offerTags: {
        some: {
          OR: [...offerTags],
        },
      },
    },
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        page: page + 1,
      },
    })

  return (
    <div>
      <ul className="DisplayList">
        {offers.map((offer) => (
          <li key={offer.id}>
            <DisplayOffer offer={offer} />
          </li>
        ))}
      </ul>

      <button disabled={page === 0} onClick={goToPreviousPage}>
        Previous
      </button>
      <button disabled={!hasMore} onClick={goToNextPage}>
        Next
      </button>
    </div>
  )
}

const SearchPage = () => {
  return (
    <Layout>
      <Head>
        <title>Offers</title>
      </Head>

      <div>
        <p>
          <Link href={Routes.NewOfferPage()}>
            <a>Create Offer</a>
          </Link>
        </p>

        <Suspense fallback={<div>Loading...</div>}>
          <OffersList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default SearchPage
