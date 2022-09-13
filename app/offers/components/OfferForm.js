import { Form } from "app/core/components/Form"
import { LabeledTextField } from "app/core/components/LabeledTextField"
export { FORM_ERROR } from "app/core/components/Form"
export function OfferForm(props) {
  return (
    <Form {...props}>
      <LabeledTextField name="name" label="Name" placeholder="Name" />
      <LabeledTextField name="description" label="Description" placeholder="Description" />
      <LabeledTextField name="link" label="Link" placeholder="Link" />
    </Form>
  )
}
