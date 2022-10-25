import { Form } from "app/core/components/Form"
import { Field } from "react-final-form"

function UserForm() {
  return (
    <>
      <Form onSubmit={() => {}}>
        <div >
          {/*  <label htmlFor="role">User role</label> */}

          <Field id="role" name="role" component="select" defaultValue="">
            <option value=""></option>
            <option value="USER">User</option>
            <option value="MODERATOR">Moderator</option>
            <option value="ADMIN">Admin</option>
          </Field>
        </div>
        <div>
          <label htmlFor="submitRole"></label>
          <input type="submit" name="submitRole" id="submitRole" value="Change role" />
        </div>
      </Form>
    </>
  )
}

export default UserForm
