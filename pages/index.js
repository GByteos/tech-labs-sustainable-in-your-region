import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import Layout from "app/core/layouts/Layout"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import logo from "public/logo.png"
import search from "public/search.png"
import NachhEntw from "public/nachEntw.png"
import WSP from "public/weihersppl1.jpg"
import AKU from "public/logo_aku.jpg"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"

/*
 * This file is just for a pleasant getting started page for your new app.
 * You can delete everything in here and start from scratch if you like.
 */

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    return (
      <>
        <button
          className="button small"
          onClick={async () => {
            await logoutMutation()
          }}
        >
          Logout
        </button>
        <div>
          User id: <code>{currentUser.id}</code>
          <br />
          User role: <code>{currentUser.role}</code>
        </div>
      </>
    )
  } else {
    return (
      <>
        <Link href={Routes.SignupPage()}>
          <a className="button small">
            <strong>Sign Up</strong>
          </a>
        </Link>
        <Link href={Routes.LoginPage()}>
          <a className="button small">
            <strong>Login</strong>
          </a>
        </Link>
      </>
    )
  }
}

const Home = () => {
  return (
    <Layout title="regional Handprint">
      <div className="up">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>
        <p>
          <a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Kontakt</a>
        </p>
        <form>
          <label htmlFor="search">
            <img src={`${search.src}`} alt="Such-Lupe" />
          </label>
          <input type="text" id="search" placeholder="Suchen" />
        </form>
      </div>
      <section className="main">
        <article className="logo">
          <img src={`${logo.src}`} alt="Logo mit dem Handabdruck und Haken" />
          <div>
            <h1>Nachhaltig in Markt&nbsp;Schwaben</h1>
            <h2>
              <br />
            </h2>
            <h3 className="mainh3">
              Die Mitmach-Seite für nachhaltige Angebote in und um Markt Schwaben
            </h3>
          </div>
        </article>
      </section>
      <header>
        <nav id="menu">
          <ul>
            <li id="minilogo">
              <a href="#">
                <img src={`${logo.src}`} alt="Logo - back home Link" />
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Konsum</h3>

              <ul>
                <li>
                  <a href="lm.html">Lebensmittel</a>
                </li>

                <li>
                  <a href="markt.html">Märkte </a>
                </li>

                <li>
                  <a href="#">Hofläden/Automaten</a>
                </li>
                <li>
                  <a href="#">Second Hand</a>
                </li>
                <li>
                  <a href="#">Fahhrad</a>
                </li>
                <li>
                  <a href="#">Haus & Garten</a>
                </li>
                <li>
                  <a href="#">Mode</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Energie</h3>

              <ul>
                <li>
                  <a href="#">Heizen</a>
                </li>

                <li>
                  <a href="#">Alternative Energien</a>
                </li>

                <li>
                  <a href="#">Strom sparen</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">
                <h3>Bildung</h3>
              </a>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Gesundheit</h3>

              <ul>
                <li>
                  <a href="#">Ernährung</a>
                </li>

                <li>
                  <a href="#">Bewegung</a>
                </li>

                <li>
                  <a href="#">Für den Geist</a>
                </li>
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">
                <h3>Inklusion</h3>
              </a>
            </li>
          </ul>
        </nav>
      </header>
      <main>
        <section className="inhalt">
          <aside>
            <div className="image_wrapper">
              <p>Termine</p>
              <a href="">
                <img
                  src="https://blankcalendarpages.com/printable_calendar/kalender1/Juli-2022-kalender-de1.jpg"
                  alt="Kalender für Juli"
                  width="200"
                />
              </a>
            </div>
            <div className="image_wrapper">
              <p>Baumpfad am Weiherspielplatz</p>
              <a href="../Baumpfad/index.html">
                <img
                  src={`${WSP.src}`}
                  width="200"
                  alt="Bild vom Weiherspielplatz, an dem der Baumpfad entstehen soll"
                />
              </a>
            </div>
            <div className="image_wrapper">
              <p>Aktivkreis Umwelt Markt&nbsp;Schwaben</p>
              <a href="https://www.marktschwabenaktiv.de/aktivkreise/umwelt/index.html">
                <img
                  src={`${AKU.src}`}
                  width="200"
                  alt="Logo des Aktivkreises Umwelt Markt Schwaben"
                />
              </a>
            </div>
          </aside>
          <div className="einl">
            <div>
              <p className="para_main">
                Wir möchten mit dieser Website das nachhaltige Leben verinfachen! Hier sollt ihr
                bald alles, was es an nachhaltigen Angeboten in Markt Schwaben und Umgebung gibt,
                finden: nachhaltiger Konsum, Fairtrade Artikel Tauschbörsen, Sharing-Angebote,
                Bildungs-Angebote, ..., Veranstaltungen, Informationen und Vernetzungsmöglichkeiten!
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
                <em>Millionen Menschen, die unperfekt nachhaltig leben!</em>
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
                . Ziel ist es, innerhalb von 15 Jahren verschiedene Maßnahmen zu initiieren, um die
                Lebensverhältnisse auf dem gesamten Planeten zu verbessern. Gleichzeitig soll für
                künftige Generationen ein Schutz der Erde sichergestellt werden. Auf der Grafik sind
                die 17 Ziele dargestellt.
              </p>
            </div>
          </article>
          <div>
            <img src={`${NachhEntw.src}`} alt="Die 17 Nachhaltigkeitsziele der UN" />
          </div>
        </section>
      </main>
      <footer>
        <Link href="/offers">
          <a>/Your offer</a>
        </Link>
        <form className="footform">
          <div>
            <label htmlFor="angebot">Welches nachhaltige Angebot hast Du?</label>
            <select id="angebot" name="angebot">
              <option value="Laden">Geschäft</option>
              <option value="Veranstaltung">Veranstaltung</option>
              <option value="Bildung">Bildungsangebot</option>
              <option value="Sharing">Sharing-Angebot</option>
              <option value="Tausch">Tausch-Angebot</option>
            </select>
            <label> In welchen Bereich passt dein Angebot?</label>
            <ul>
              <li>
                <input type="checkbox" name="lmr" id="lmr" value="lmr" />
                <label htmlFor="lmr">Lebensmittel regional</label>
              </li>
              <li>
                <input type="checkbox" name="lmb" id="lmb" value="lmb" />
                <label htmlFor="lmb">Lebensmittel bio</label>
              </li>
              <li>
                <input type="checkbox" name="dro" id="dro" value="dro" />
                <label htmlFor="dro">Drogerieartikel</label>
              </li>
              <li>
                <input type="checkbox" name="kle" id="kle" value="kle" />
                <label htmlFor="kle">Kleidung</label>
              </li>
              <li>
                <input type="checkbox" name="mob" id="mob" value="mob" />
                <label htmlFor="mob">Mobilität</label>
              </li>
              <li>
                <input type="checkbox" name="nat" id="nat" value="nat" />
                <label htmlFor="nat">Natur</label>
              </li>
              <li>
                <input type="checkbox" name="ges" id="ges" value="ges" />
                <label htmlFor="ges">Gesundheit</label>
              </li>
              <li>
                <input type="checkbox" name="ene" id="ene" value="ene" />
                <label htmlFor="ene">Energie</label>
              </li>
              <li>
                <input type="checkbox" name="hh" id="hh" value="hh" />
                <label htmlFor="hh">Haushalt</label>
              </li>
              <li>
                <input type="checkbox" name="sh" id="sh" value="ink" />
                <label htmlFor="sh">Second Hand</label>
              </li>
            </ul>
          </div>
          <div className="part2">
            <label htmlFor="sonst">Beschreibe hier dein Angebot</label>
            <textarea
              name="sonst"
              id="sonst"
              cols="30"
              rows="10"
              placeholder="Mein Angebot"
            ></textarea>
          </div>
          <div className="part3">
            <label htmlFor="email">Email-Adresse</label>
            <input type="email" id="email" placeholder="email" />
            <br />
            <label htmlFor="web">Deine Website</label>
            <input type="text" id="web" placeholder="url" />
            <br />
            <label htmlFor="file">Lade hier Bilder und weitere informationen hoch</label>
            <input type="file" id="file" />
            <br />
            <label htmlFor="submit">Eintrag abschicken</label>
            <input type="submit" name="submit" id="submit" value="Auf geht's" />
          </div>
        </form>
        <div className="up">
          <a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Kontakt</a>
          <a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Datenschutz</a>
          <a href="mailto:kontakt@nachhaltig-in-marktschwaben.de">Impressum</a>
        </div>
      </footer>
    </Layout>
  )
}

export default Home
