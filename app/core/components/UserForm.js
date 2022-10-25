import { Form } from "app/core/components/Form"
import { Field } from "react-final-form"
import { useMutation } from "@blitzjs/rpc"
import deleteUser from "app/auth/mutations/deleteUser"
import changeUserRole from "app/auth/mutations/changeUserRole"

function UserForm({ user }) {
  const [deleteUserMutation] = useMutation(deleteUser)
  const [changeUserRoleMutation] = useMutation(changeUserRole)

  return (
    <>
      <div>
        <Form
          onSubmit={(values) => {
            changeUserRoleMutation({ id: user.id, role: values.role })
          }}
          initialValues={{ role: user.role }}
        >
          <div>
            {/*  <label htmlFor="role">User role</label> */}

            <Field id="role" name="role" component="select" defaultValue="">
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
        <button
          type="button"
          onClick={async () => {
            if (window.confirm("User will be deleted!")) {
              await deleteUserMutation({
                id: user.id,
              })
            }
          }}
          style={{
            marginLeft: "0.5rem",
          }}
        >
          Delete
        </button>
      </div>
    </>
  )
}

export default UserForm
