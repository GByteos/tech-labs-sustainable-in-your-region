import Layout from "app/core/layouts/Layout"
import { LoginForm } from "app/auth/components/LoginForm"
import { useRouter } from "next/router"
import HEADER from "pages/components/Header"

const LoginPage = () => {
  const router = useRouter()
  return (
    <Layout title="Log In">
      <HEADER/>
      <LoginForm
        onSuccess={(_user) => {
          const next = router.query.next ? decodeURIComponent(router.query.next) : "/"
          return router.push(next)
        }}
      />
    </Layout>
  )
}

export default LoginPage
