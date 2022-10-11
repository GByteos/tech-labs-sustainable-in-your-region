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
                  With this Website we want to facilitate a sustainable lifestyle. Here, you will
                  find all sustainable offers of your region and surroundings: shops with
                  sustainable products, regional and organic food, sharing offers, events, learning
                  opportunities, information and networking opportunities. We want to show the
                  regional ecological handprin of your region , i.e. what is already there,
                  possible, and can be easily used/accessed, contrary to the ecological footprint,
                  and how you can increase your personal handprint.
                </p>
                <br />
              </div>
              <div>
                <h2
                  style={{
                    textAlign: "center",
                  }}
                >
                  We don't need a handful of people living perfectly sustainable, we need
                  <em> millions of people doing it imperfectly!</em>
                </h2>
                <br />
                <p className="cit para_main">
                  after Anne-Marie Bonneau from&nbsp;
                  <a href="https://www.instagram.com/zerowastechef/?hl=de">zerowastechef</a>
                </p>
              </div>
            </div>
          </section>
          <section className="nachh">
            <article>
              <div>
                <h3>What actually is sustainability?</h3>
                <p className="para_main">
                  Sustainability – a word that we are facing more and more often in the last years.
                  But what does it mean exactly? WHile in our everydaylife we associate it with
                  longevity and protection of the environment, a sustainable development refers to a
                  responsible handling of the finite ressources of the planet.
                </p>
              </div>
              <div>
                <h3>17 sustainable development goals of the UN</h3>
                <p className="para_main">
                  <a href="https://sdgs.un.org/goals" target="_blank" rel="noreferrer">
                    {" "}
                    The 2030 Agenda for Sustainable Development{" "}
                  </a>
                  , adopted by all United Nations Member States in 2015, provides a shared blueprint
                  for peace and prosperity for people and the planet, now and into the future. At
                  its heart are the 17 Sustainable Development Goals (SDGs), which are an urgent
                  call for action by all countries - developed and developing - in a global
                  partnership. They recognize that ending poverty and other deprivations must go
                  hand-in-hand with strategies that improve health and education, reduce inequality,
                  and spur economic growth – all while tackling climate change and working to
                  preserve our oceans and forests.
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

export default Home
