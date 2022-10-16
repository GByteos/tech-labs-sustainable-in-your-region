import Image from "next/image"
import Layout from "app/core/layouts/Layout"
import NachhEntw from "public/nachEntw.jpg"

const Home = () => {
  return (
    <Layout title="regional Handprint">
      <main>
        <div>
          <section className="inhalt">
            <div className="einl">
              <div>
                <p className="para_main">
                  Wir möchten mit dieser Website das nachhaltige Leben verinfachen! Hier sollt ihr
                  bald alles, was es an nachhaltigen Angeboten in Markt Schwaben und Umgebung gibt,
                  finden: nachhaltiger Konsum, Fairtrade Artikel Tauschbörsen, Sharing-Angebote,
                  Bildungs-Angebote, ..., Veranstaltungen, Informationen und
                  Vernetzungsmöglichkeiten!
                  <br />
                  und dann die Seite weiter ausbauen! <br />
                  So wollen wir zeigen, wie groß der ökologische Handabdruck von Markt Schwaben und
                  Umgebung ist und wie jeder seinen persönlichen Handabdruck vergößern kann!
                </p>
                <br />
              </div>
              <div>
                <h2>
                  Wir brauchen keine Handvoll Menschen, die perfekt nachhaltig leben. Wir brauchen
                  <em> Millionen Menschen, die unperfekt nachhaltig leben!</em>
                </h2>
                <br />
                <p className="cit para_main">
                  nach Anne-Marie Bonneau von&nbsp;
                  <a href="https://www.instagram.com/zerowastechef/?hl=de">zerowastechef</a>
                </p>
              </div>
            </div>
          </section>
          <section className="nachh">
            <article>
              <div>
                <h3>Was ist eigentlich Nachhaltigkeit?</h3>
                <p className="para_main">
                  Nachhaltigkeit – ein Wort, das uns in den letzten Jahren immer häufiger in fast
                  allen Bereichen unseres Lebens begegnet. Doch was heißt Nachhaltigkeit genau?
                  Während wir im Alltagssprachgebrauch den Begriff u. a. mit Langlebigkeit und
                  Umweltschutz verbinden, bezieht sich „nachhaltige Entwicklung“ auf den
                  verantwortungsbewussten Umgang mit den endlichen Ressourcen unserer Erde.
                </p>
              </div>
              <div>
                <h3>17 Nachhaltigkeitsziele der UN</h3>
                <p className="para_main">
                  2015 verabschiedete die UN-Vollversammlung im Rahmen des UN-Nachhaltigkeitsgipfels
                  die
                  <a href="https://17ziele.de/" target="_blank" rel="noreferrer">
                    „Agenda 2030 für nachhaltige Entwicklung“
                  </a>
                  . Ziel ist es, innerhalb von 15 Jahren verschiedene Maßnahmen zu initiieren, um
                  die Lebensverhältnisse auf dem gesamten Planeten zu verbessern. Gleichzeitig soll
                  für künftige Generationen ein Schutz der Erde sichergestellt werden. Auf der
                  Grafik sind die 17 Ziele dargestellt.
                </p>
              </div>
            </article>
            <div className="NZUN">
              <Image src={NachhEntw} alt="Die 17 Nachhaltigkeitsziele der UN" />
            </div>
          </section>
        </div>
      </main>
    </Layout>
  )
}

export default HomeGerman
