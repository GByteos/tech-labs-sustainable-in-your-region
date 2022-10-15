import { Form } from "app/core/components/Form"
import { Field } from "react-final-form"
import { FileField } from "app/core/components/FileField"
import { useQuery } from "@blitzjs/rpc"
import getPublicTags from "app/offer-tags/queries/getPublicTags"
//import styles from "pages/styles/OfferForm.module.css"
import { Multiselect } from "multiselect-react-dropdown"
export { FORM_ERROR } from "app/core/components/Form"

const Error = ({ name }) => (
  <Field name={name} subscription={{ error: true, touched: true }}>
    {({ meta: { error, touched } }) => (error && touched ? <span>{error}</span> : null)}
  </Field>
)

const Condition = ({ when, is, children }) => (
  <Field name={when} subscription={{ value: true }}>
    {({ input: { value } }) => (value === is ? children : null)}
  </Field>
)

export function OfferForm(props) {
  const [availableTags] = useQuery(getPublicTags)
  const initialTags = []
  if (props.initialValues) {
    for (const tag of props.initialValues.offerTags) {
      const newTag = availableTags.find((t) => t.id === tag.id)
      initialTags.push(newTag)
    }
  }

  return (
    <Form {...props} className="footform">
      <h3>Your offer</h3>
      <div className="FormElement">
        <label htmlFor="offerType">What type of offer do you have?</label>
        <br />
        <Field id="offerType" name="offerType" component="select" defaultValue="">
          <option value=""></option>
          <option value="SHOP">Shop</option>
          <option value="EVENT">Event</option>
          {/* <option value="Bildung">Bildungsangebot</option>
          <option value="Sharing">Sharing-Angebot</option>
          <option value="Tausch">Tausch-Angebot</option> */}
        </Field>
      </div>
      <Field name="name">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="name">Title</label>
            <br />
            <input {...input} type="text" id="name" cols="30" placeholder="Title of your offer" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
      {/* TAG CATEGORY */}
      <div className="FormElement">
        <label> Of which category is your offer?</label>
        <div>
          <label>
            <Field type="checkbox" component="input" name="CONSUME" value="cons" />
            Consume
          </label>

          <label htmlFor="INCLUSIVITY">
            <Field
              type="checkbox"
              component="input"
              name="INCLUSIVITY"
              id="INCLUSIVITY"
              value="incl"
            />
            Inclusivity
          </label>

          <label htmlFor="EDUCATION">
            <Field type="checkbox" component="input" name="EDUCATION" id="EDUCATION" value="edu" />
            Education
          </label>

          <label htmlFor="mob">
            <Field type="checkbox" component="input" name="MOBILITY" id="mob" value="mob" />
            Mobility
          </label>

          <label htmlFor="ges">
            <Field type="checkbox" component="input" name="HEALTH" id="ges" value="ges" />
            Health
          </label>

          <label htmlFor="ene">
            <Field type="checkbox" component="input" name="ENERGY" id="ene" value="ene" />
            Energy
          </label>
        </div>
      </div>
      <Field name="offerTags">
        {({ input, meta }) => (
          <div className="FormElement">
            <label>
              Which tags fit your offer?
              <Multiselect
                name={input.name}
                value={[input.value]}
                options={availableTags}
                displayValue="name"
                onRemove={input.onChange}
                onSelect={input.onChange}
                selectedValues={initialTags}
                // groupBy="category"
              />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </label>
          </div>
        )}
      </Field>

      <Field name="description">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="description">Please give here a description of your offer: </label>
            <br />
            <textarea
              className="descriptionInput"
              {...input}
              // type="textarea"
              id="sonst"
              cols="30"
              rows="10"
              placeholder="Description"
            />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      {/* <Condition when="offerType" is="SHOP"> */}
      <Field name="openingTimes">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="openingTimes">Opening Times / Time of Event </label>
            <br />
            <input
              className="openingTimesInput"
              {...input}
              type="textarea"
              id="openingTimes"
              placeholder="Mo-Fr: 8-12:30, 15-19:30"
            />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
      {/* </Condition> */}

      <Condition when="offerType" is="EVENT">
        <Field name="date">
          {({ input, meta }) => (
            <div className="FormElement">
              <label htmlFor="date">Date </label>
              <br />
              <input {...input} name="date" type="date" id="date" />
              {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
          )}
        </Field>
      </Condition>
      <br />
      <h3>Contact Information</h3>
      <Field name="link">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="link">Your Website</label>
            <br />
            <input {...input} id="link" placeholder="https://" type="url" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <Field name="email">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="email">Your email</label>
            <br />
            <input {...input} id="email" placeholder="sustainable@offer.com" type="mail" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <Field name="street">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="street">Street and number</label>
            <br />
            <input {...input} id="street" placeholder="Yourstreet 123" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <Field name="zip">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="zip">Zip code</label>
            <br />
            <input {...input} id="zip" placeholder="98765" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <Field name="city">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="city">Your city</label>
            <br />
            <input {...input} id="city" placeholder="Your city" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <Field name="tel">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="tel">Your phone number</label>
            <br />
            <input {...input} id="tel" placeholder="0123 456 78 90" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <div className="FormElement">
        <label htmlFor="logo">Upload your image or logo</label>
        <FileField
          type="file"
          id="file"
          initialValue={props.initialValues ? props.initialValues.logo : ""}
          name="logo"
        />
      </div>
      <br />
      <div className="FormElement">
        <label htmlFor="submit"></label>
        <input type="submit" name="submit" id="submit" value="Let's go!" />
      </div>
    </Form>
  )
}
