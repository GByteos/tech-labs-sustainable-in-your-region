import Image from "next/image"
import Link from "next/link"
import YL from "public/yourlogo.png"
import { Routes } from "@blitzjs/next"

function Logo ({offer}) {
  console.log({offer})
  if (!offer.logo) {
    return (
      <>
        <Image className="displaylogo" src={YL} alt="Offer Logo" width="150px" height="150px" />
      </>)
  }
  else
    return (
      <>
        <Image
          className="displaylogo"
          src={"/api/getImage?imageId=" + offer.logo}
          alt="Offer Logo"
          width="150px"
          height="150px" />
      </>
    )
}

function DisplayOffer({ offer }) {
  return (
    <article className="eintrag">
      <a className="LOGO" href={offer.link}>

        <Logo offer={offer} />
      </a>

      <div className="para_main offertext">
        <Link
          href={Routes.ShowOfferPage({
            offerId: offer.id,
          })}
        >
          <a>
            <h3>{offer.name}</h3>
          </a>
        </Link>
        <p>{offer.description}</p>
      </div>
      <div className="para_main info">
        <ul>
          <li>{offer.openingTimes}</li>
          {/* <li>Sa: 8-13 Uhr</li>
                    <br />
                    <li>Wolfmühle 1</li>
                    <li>85661 Forstinning</li>
                    <li>08121 / 3334</li> */}
        </ul>
      </div>
    </article>
  )
}

export default DisplayOffer
