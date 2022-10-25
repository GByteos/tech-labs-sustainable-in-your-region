import { Suspense } from "react"
import { useRouterQuery } from "@blitzjs/next"
import Head from "next/head"
import { usePaginatedQuery, useQuery } from "@blitzjs/rpc"
import getPublicTags from "app/offer-tags/queries/getPublicTags"
import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import getPublicOffers from "app/offers/queries/getPublicOffers"
import DisplayOffer from "app/offers/components/DisplayOffer"
import Form from "app/core/components/Form"
import { Field } from "react-final-form"
import { Multiselect } from "multiselect-react-dropdown"

const ITEMS_PER_PAGE = 20

export const SearchList = () => {
  const query = useRouterQuery()
  const [availableTags] = useQuery(getPublicTags)

  const tags = query.tags ? JSON.parse(decodeURIComponent(query.tags)) : null

  let offerTags = []

  if (tags && tags.length !== 0) {
    for (const tag of tags) {
      offerTags.push({ name: tag })
    }
  }

  let offerTypeShops = query.otShop ? query.otShop : true
  let offerTypeEvents = query.otEvent ? query.otEvent : true

  const where = {
    offerTags: {
      some: {
        OR: [...offerTags],
      },
    },
  }

  if (query.searchTerm) {
    where.description = {
      contains: query.searchTerm,
    }
  }

  const router = useRouter()
  const page = Number(router.query.page) || 0
  const [{ offers, hasMore, count }] = usePaginatedQuery(getPublicOffers, {
    where: where,
    orderBy: {
      id: "asc",
    },
    skip: ITEMS_PER_PAGE * page,
    take: ITEMS_PER_PAGE,
    count: count,
  })

  const goToPreviousPage = () =>
    router.push({
      query: {
        ...query,
        page: page - 1,
      },
    })

  const goToNextPage = () =>
    router.push({
      query: {
        ...query,
        page: page + 1,
      },
    })

  const search = (values) => {
    // update query
    query.searchTerm = values.name
    query.tags = JSON.stringify(values.selectedTags.map((t) => t.name))
    query.otShop = values.checkBoxShop
    query.otEvent = values.checkBoxEvent

    router.push({ query: query })
  }
  return (
    <div className="search">
      <Form onSubmit={search} initialValues={{ selectedTags: offerTags, name: query.searchTerm }}>
        <div>
          <h4>What are you searching for?</h4>
          <Field name="name">
            {({ input, meta }) => (
              <div className="FormElement searchField">
                <input {...input} type="text" id="search" cols="30" />
                <input type="submit" name="submit" id="submit" value="Search" />
                {meta.error && meta.touched && <span>{meta.error}</span>}
              </div>
            )}
          </Field>
          <br />
          <p>Found {count} offers</p>
        </div>
        <div>
          <h4>Filter</h4>
          <div className="searchCategory">
            <Field name="checkBoxShop">
              {({ input, meta }) => (
                <div className="FormElement">
                  <input type="checkbox" {...input} />
                  <label htmlFor="checkBoxShop">Shops</label>
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
            <Field name="checkBoxEvent">
              {({ input, meta }) => (
                <div className="FormElement">
                  <input type="checkbox" {...input} />
                  <label htmlFor="checkBoxEvent">Events</label>
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </div>
              )}
            </Field>
          </div>{" "}
          <Field name="selectedTags">
            {({ input, meta }) => (
              <div className="FormElement">
                <label>
                  <Multiselect
                    name={input.name}
                    value={[input.value]}
                    options={availableTags}
                    displayValue="name"
                    onRemove={input.onChange}
                    onSelect={input.onChange}
                    selectedValues={offerTags}
                    // groupBy="category"
                  />
                  {meta.error && meta.touched && <span>{meta.error}</span>}
                </label>
                <input type="submit" name="submit" id="submit" value="Search" />
              </div>
            )}
          </Field>
        </div>
      </Form>
      <ul className="DisplayList">
        {offers.map((offer) => (
          <li key={offer.id}>
            <DisplayOffer offer={offer} highlightText={query.searchTerm} />
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
        <Suspense fallback={<div>Loading...</div>}>
          <SearchList />
        </Suspense>
      </div>
    </Layout>
  )
}

export default SearchPage
