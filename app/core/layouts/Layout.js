import Head from "next/head"
import React from "react"
import HEADER from "pages/components/Header"
import FOOTER from "pages/components/Footer"

const Layout = ({ title, children}) => {
  return (
    <>
      <Head>
        <title>{title || "Tech_Labs_Sustainablity"}</title>
        <link rel="icon" href="/logo.png" />
      </Head>
      <HEADER />
      <main> {children}</main>
      <FOOTER />
    </>
  )
}

export default Layout
