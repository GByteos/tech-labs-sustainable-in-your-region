import { ErrorComponent, ErrorBoundary } from "@blitzjs/next"
import { AuthenticationError, AuthorizationError } from "blitz"
import React from "react"
import { withBlitz } from "app/blitz-client"
import "./style.css"
import Layout from "app/core/layouts/Layout"
import DisplayList from "app/offers/components/DisplayList"
function RootErrorFallback({ error }) {
  if (error instanceof AuthenticationError) {
    return (
      <Layout>
        {/* <DisplayList/> */}
        {/* Error: You are not authenticated <br /> You need to login before adding an offer */}
      </Layout>
    )
  } else if (error instanceof AuthorizationError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, you are not authorized to access this"
      />
    )
  } else {
    return (
      <ErrorComponent statusCode={error?.statusCode || 400} title={error.message || error.name} />
    )
  }
}

function MyApp({ Component, pageProps }) {
  return (
    <ErrorBoundary FallbackComponent={RootErrorFallback}>
      <Component {...pageProps} />
    </ErrorBoundary>
  )
}

export default withBlitz(MyApp)
