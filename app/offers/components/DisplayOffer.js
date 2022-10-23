import Image from "next/image"
import Link from "next/link"
import YL from "public/yourlogo.png"
import { Routes } from "@blitzjs/next"
import Highlight from "react-highlighter"
import Truncate from "react-truncate"
import { string } from "zod"

function Logo({ offer }) {
  if (!offer.logo) {
    return (
      <>
        <Image className="displaylogo" src={YL} alt="Offer Logo" width="150px" height="150px" />
      </>
    )
  } else
    return (
      <>
        <Image
          className="displaylogo"
          src={"/api/getImage?imageId=" + offer.logo}
          alt="Offer Logo"
          width="150px"
          height="150px"
        />
      </>
    )
}

function DisplayOffer({ offer, highlightText }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}

  return (
    <>
      <p className="smallheader1">
        {offer.offerType} -{" "}
        {offer.offerTags.map((tagname) => (
          <p key={tagname.id} className="Tags">
            {" "}
            {tagname.name}{" "}
          </p>
        ))}
      </p>

      <article className="eintrag">
        <div>
          <a className="LOGO" href={offer.link}>
            <Logo offer={offer} />
          </a>
        </div>

        {/*  */}
        <div className="para_main offertext">
          <Link
            href={Routes.ShowOfferPage({
              offerId: offer.id,
            })}
          >
            <a>
              <h4>{offer.name}</h4>
            </a>
          </Link>

          {(() => {
            if (highlightText) {
              return <Highlight search={highlightText}>{offer.description}</Highlight>
            } else {
              return <p>{offer.description}</p>
            }
          })()}
        </div>
        <div className="para_main info">{offer.openingTimes}</div>
      </article>
    </>
  )
}

export default DisplayOffer
