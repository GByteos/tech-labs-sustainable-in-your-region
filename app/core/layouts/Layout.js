import Head from "next/head"
import React from "react"

const Layout = ({ title, children }) => {
  return (
    <>
      <Head>
        <title>{title || "Tech_Labs_Sustainablity"}</title>
        <link rel="icon" href="/logo.png" />
      </Head>

      {children}
    </>
  )
}

export default Layout
