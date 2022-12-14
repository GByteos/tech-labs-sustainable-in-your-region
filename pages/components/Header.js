import logo from "public/logo.png"
import search from "public/search.png"
import Image from "next/image"
import Link from "next/link"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { useQuery, useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useEffect, useState, Suspense } from "react"
import getPublicTags from "app/offer-tags/queries/getPublicTags"

const UserCondition = ({ role }) => {
  if (role === "ADMIN" || role === "MODERATOR")
    return (
      <Link href={Routes.userPage()}>
        <a> User</a>
      </Link>
    )
}

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)

  if (currentUser) {
    // const currentUserId = currentUser.id
    return (
      <>
        <Suspense fallback={<div>Loading...</div>}>
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
            <Link href={Routes.MyOffersPage({ userid: currentUser.id })}>
              <a>My Offers </a>
            </Link>
            <p></p>
            <UserCondition role={currentUser.role} />
          </div>
        </Suspense>
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

const Menue = () => {
  // get the tags from the db
  const tags = {
    consume: useQuery(getPublicTags, "CONSUME")[0],
    energy: useQuery(getPublicTags, "ENERGY")[0],
    education: useQuery(getPublicTags, "EDUCATION")[0],
    health: useQuery(getPublicTags, "HEALTH")[0],
    inclusivity: useQuery(getPublicTags, "INCLUSIVITY")[0],
  }

  tags.consume = useQuery(getPublicTags, "CONSUME")[0]

  return (
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
  )
}

function HEADER() {
  const [currenturl, setUrl] = useState("")
  useEffect(() => setUrl(window.location.href), [])

  return (
    <div>
      <div className="up">
        <Suspense fallback={<div>Loading...</div>}>
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
            <h1>Sustainable in Markt&nbsp;Schwaben</h1>
            <h2>{`${currenturl}`}</h2>
            <h3 className="mainh3">Sustainable offers in Markt Schwaben and sourroundings</h3>
          </div>
        </article>
      </section>
      <header className="MainHeader">
        <Suspense fallback={<div>Loading...</div>}>
          <Menue />
        </Suspense>
      </header>
    </div>
  )
}
export default HEADER
