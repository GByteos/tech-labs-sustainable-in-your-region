import Head from "next/head"
import React from "react"
import HEADER from "pages/components/Header"
import FOOTER from "pages/components/Footer"
import LatestOffers from "pages/components/LatestOffers"
import { Suspense } from "react"

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Tech_Labs_Sustainablity"}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <Suspense fallback={<div>Loading...</div>}>
        <HEADER />
      </Suspense>
      <main>
        <Suspense fallback={<div>Loading...</div>}>
          <LatestOffers />{" "}
        </Suspense>
        <Suspense fallback={<div>Loading...</div>}>
          {" "}
          <div className="content">{children}</div>
        </Suspense>
      </main>
      <FOOTER />
    </>
  )
}

export default Layout
