import logo from "public/logo.png"
import search from "public/search.png"
import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { useCurrentUser } from "app/core/hooks/useCurrentUser"
import logout from "app/auth/mutations/logout"
import { useMutation } from "@blitzjs/rpc"
import { Routes } from "@blitzjs/next"
import { useEffect, useState } from 'react'

const UserInfo = () => {
  const currentUser = useCurrentUser()
  const [logoutMutation] = useMutation(logout)
  const currenUserId = currentUser
  console.log(currentUser )
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
        <div>  <Link href="/offers/">
                <a>My Offers</a>
              </Link></div>
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
      <section className="main">
        <article className="logo">
          <Image src={logo} alt="Logo mit dem Handabdruck und Haken" width="180" height="200"/>
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
            <li >
              <Link href={Routes.Home()}>
                <Image src={logo} width="50px" height="50px" alt="Logo - back home Link" />
              </Link>
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
          <ul>
            <li>
            
              
              <div>
              
                <Link href="/offers">
                  <a>Offers</a>
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
