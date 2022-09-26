import Image from "next/image"
import WSP from "public/weihersppl1.jpg"
import AKU from "public/logo_aku.jpg"
import Cal from "public/Calendar.jpg"

function LatestOffers() {
  return (
    <aside>
      <div className="image_wrapper">
        <p>Termine</p>
        <a href="">
          <Image src={Cal} width="200px" height="150px" alt="Kalender für Juli" />
        </a>
      </div>
      <div className="image_wrapper">
        <p>Baumpfad am Weiherspielplatz</p>
        <a href="../Baumpfad/index.html">
          <Image
            src={WSP}
            width="200px"
            height="150px"
            alt="Bild vom Weiherspielplatz, an dem der Baumpfad entstehen soll"
          />
        </a>
      </div>
      <div className="image_wrapper">
        <p>Aktivkreis Umwelt Markt&nbsp;Schwaben</p>
        <a href="https://www.marktschwabenaktiv.de/aktivkreise/umwelt/index.html">
          <Image
            src={AKU}
            width="200px"
            height="100px"
            alt="Logo des Aktivkreises Umwelt Markt Schwaben"
          />
        </a>
      </div>
    </aside>
  )
}
export default LatestOffers