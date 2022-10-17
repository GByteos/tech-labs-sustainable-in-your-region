import Image from "next/image"
import Link from "next/link"
import YL from "public/yourlogo.png"
import { Routes } from "@blitzjs/next"
import Truncate from "react-truncate"


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

function DisplayOffer({ offer }) {
  // const tags = {
  //   offer.id: useQuery(getPublicTags, "")[0]}
  
  return (
    <>
      <p className="smallheader1">
        {offer.offerType} -{" "}
        {offer.offerTags.map((tagname) => (
          <p key={tagname.id} className="Tags"> {tagname.name} </p>
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

          <Truncate
            lines={1}
            width={1200} // width being how much you want to truncate your copy
            ellipsis="&hellip;"
          >
            <p>{offer.description}</p>
          </Truncate>
        </div>
        <div className="para_main info">{offer.openingTimes}</div>
      </article>
    </>
  )
}

export default DisplayOffer
