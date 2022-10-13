import logo from "public/logo.png"
import search from "public/search.png"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useEffect, useState } from "react"
import getPublicTags from "app/offer-tags/queries/getPublicTags"

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
console.log(currentUser.id)
  if (currentUser) {
    const currentUserId = currentUser.id
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
        <div>
          {" "}
          <Link href={Routes.MyOffersPage({userid: currentUser.id })}>
            <a>My Offers </a>
          </Link>
          <p></p>
          <Link href={Routes.userPage()}>
            <a> User</a>
          </Link>
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

function HEADER() {
  const [currenturl, setUrl] = useState("")
  useEffect(() => setUrl(window.location.href), [])

  // get the tags from the db
  const tags = {
    consume: useQuery(getPublicTags, "CONSUME")[0],
    energy: useQuery(getPublicTags, "ENERGY")[0],
    education: useQuery(getPublicTags, "EDUCATION")[0],
    health: useQuery(getPublicTags, "HEALTH")[0],
    inclusivity: useQuery(getPublicTags, "INCLUSIVITY")[0],
  }
  return (
    <div>
      <div className="up">
        <Suspense fallback="Loading...">
          <UserInfo />
        </Suspense>

        <form>
          <label htmlFor="search">
            <Image src={search} alt="Such-Lupe" width="25px" height="25px" />
          </label>
          <input type="text" id="search" placeholder="Suchen" />
        </form>
      </div>
      <section className="mainHeader">
        <article className="logo">
          <Image src={logo} alt="Logo mit dem Handabdruck und Haken" width="180" height="200" />
          <div>
            <h1>Nachhaltig in Markt&nbsp;Schwaben</h1>
            <h2>{`${currenturl}`}</h2>
            <h3 className="mainh3">
              Die Mitmach-Seite für nachhaltige Angebote in und um Markt Schwaben
            </h3>
          </div>
        </article>
      </section>
      <header>
        <nav id="menu">
          <ul id="minilogo">
            <li>
              <Link href={Routes.Home()}>
                <Image src={logo} width="50px" height="50px" alt="Logo - back home Link" />
              </Link>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Consume</h3>

              <ul>
                {tags.consume.map((tag) => (
                  <li key={tag.id}>
                    <Link href={Routes.SearchPage({ tags: JSON.stringify([tag.name]) })}>
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Energy</h3>

              <ul>
                {tags.energy.map((tag) => (
                  <li key={tag.id}>
                    <Link href={Routes.SearchPage({ tags: JSON.stringify([tag.name]) })}>
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">
                <h3>Education</h3>
              </a>
              <ul>
                {tags.education.map((tag) => (
                  <li key={tag.id}>
                    <Link href={Routes.SearchPage({ tags: JSON.stringify([tag.name]) })}>
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <h3>Health</h3>

              <ul>
                {tags.health.map((tag) => (
                  <li key={tag.id}>
                    <Link href={Routes.SearchPage({ tags: JSON.stringify([tag.name]) })}>
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <a href="#">
                <h3>Inclusivity</h3>
              </a>
              <ul>
                {tags.inclusivity.map((tag) => (
                  <li key={tag.id}>
                    <Link href={Routes.SearchPage({ tags: JSON.stringify([tag.name]) })}>
                      {tag.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </li>
          </ul>
          <ul>
            <li>
              <div>
                <Link href={Routes.OffersPage()}>
                  <h3>All Offers</h3>
                </Link>
              </div>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  )
}
export default HEADER
