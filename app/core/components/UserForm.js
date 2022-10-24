import { Form } from "app/core/components/Form"
import { Field } from "react-final-form"

function UserForm() {
  return (
    <>
      <Form >
        <div className="FormElement">
          <label htmlFor="role">User role</label>
          <br />
          <Field id="role" name="role" component="select" defaultValue="">
            <option value=""></option>
            <option value="USER">Shop</option>
            <option value="ADMIN">Event</option>
            <option value="MODERATION">Event</option>
          </Field>
        </div>
        <div className="FormElement">
          <label htmlFor="submitRole"></label>
          <input type="submit" name="submitRole" id="submitRole" value="Change role" />
        </div>
      </Form>
    </>
  )
}

export default UserForm
