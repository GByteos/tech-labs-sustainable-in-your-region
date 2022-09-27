import Image from "next/image"
import YL from "public/yourlogo.png"

function DisplayOffer({offer}) {
  console.log(offer)
  return (
    <article className="eintrag">
      <a href={offer.link}>
        {/* {LOGO} */}
        <Image src={YL} alt="Offer Logo" width="150px" height="150px" />
      </a>
      <div className="para_main">
        <h3>{offer.name}</h3>
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
