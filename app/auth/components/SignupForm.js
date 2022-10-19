import { LabeledTextField } from "app/core/components/LabeledTextField"
import { Form, FORM_ERROR } from "app/core/components/Form"
import signup from "app/auth/mutations/signup"
import { Signup } from "app/auth/validations"
import { useMutation } from "@blitzjs/rpc"
export const SignupForm = (props) => {
  const [signupMutation] = useMutation(signup)
  return (
    <div>
      <h1>Create an Account</h1>

      <Form
        submitText="Create Account"
        schema={Signup}
        initialValues={{
          name: "",
          email: "",
          password: "",
        }}
        onSubmit={async (values) => {
          try {
            await signupMutation(values)
            props.onSuccess?.()
          } catch (error) {
            if (error.code === "P2002" && error.meta?.target?.includes("email")) {
              // This error comes from Prisma
              return {
                email: "This email is already being used",
              }
            } else {
              return {
                [FORM_ERROR]: error.toString(),
              }
            }
          }
        }}
      >
      
        <div className="FormElement">
          <LabeledTextField className="signupfield" name="name" label="Username" placeholder="Username" />
          <br />
          <LabeledTextField
            className="signupfield"
            name="email"
            label="Email"
            placeholder="Email"
          />
          <br />
          <LabeledTextField
            className="signupfield"
            name="password"
            label="Password"
            placeholder="Password"
            type="password"
          />
        </div>
      </Form>
    </div>
  )
}
export default SignupForm
