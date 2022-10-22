import Image from "next/image"
import WSP from "public/weihersppl1.jpg"
import AKU from "public/logo_aku.jpg"
import Cal from "public/Calendar.jpg"
import { Suspense } from "react"
import getLatestOffers from "app/offers/queries/getLatestOffers"
import { Routes } from "@blitzjs/next"
import { useQuery } from "@blitzjs/rpc"
import Link from "next/link"

export const LatestOffersList = () => {
  const [{ offers }] = useQuery(getLatestOffers, {
    orderBy: {
      createdAt: "desc",
    },
    take: 4,
  })
  return (
    <>
      <ul className="LatestOffersList">
        {offers.map((offer) => (
          <li key={offer.id}>
            <h6>{offer.date}</h6>
            <h5>{offer.offerType}</h5>
            <Link
              href={Routes.ShowOfferPage({
                offerId: offer.id,
              })}
            >
              <a>
                <h4>{offer.name}</h4>
              </a>
            </Link>
            {offer.offerTags.map((tagname) => (
              <p key={tagname.id} className="Tags">
                {" "}
                {tagname.name}{" "}
              </p>
            ))}
          </li>
        ))}
      </ul>
    </>
  )
}
const LatestOffers = () => {
  return (
    <aside>
      <div className="image_wrapper">
        <p>Upcoming events</p>
        <a href="">
          <Image src={Cal} width="200px" height="150px" alt="Kalender für Juli" />
        </a>
      </div>
      <div>
        <p>Latest offers</p>
        <Suspense fallback={<div>Loading...</div>}>
          <LatestOffersList />
        </Suspense>
      </div>
    </aside>
  )
}
export default LatestOffers
