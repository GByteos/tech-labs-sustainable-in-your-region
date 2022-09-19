import { useRouter } from "next/router"
import Layout from "app/core/layouts/Layout"
import { SignupForm } from "app/auth/components/SignupForm"
import { Routes } from "@blitzjs/next"
import HEADER from "pages/components/Header"

const SignupPage = () => {
  const router = useRouter()
  return (
    <Layout title="Sign Up">
      <HEADER/>
      <SignupForm onSuccess={() => router.push(Routes.Home())} />
    </Layout>
  )
}

export default SignupPage
