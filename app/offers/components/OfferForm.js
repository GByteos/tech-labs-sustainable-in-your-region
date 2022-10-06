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
  const isLoggedIn = props.isLoggedIn

  const [tags] = useQuery(getPublicTags)

  // tags.offerTags contains a object list of the tags
  console.log(tags)

  return (
    <Form {...props} className="footform">
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
            <Field type="checkbox" component="input" name="CONSUME" value="freg" />
            Consume
          </label>

          <label htmlFor="INCLUSIVITY">
            <Field
              type="checkbox"
              component="input"
              name="INCLUSIVITY"
              id="INCLUSIVITY"
              value="fbio"
            />
            Inclusivity
          </label>

          <label htmlFor="EDUCATION">
            <Field type="checkbox" component="input" name="EDUCATION" id="EDUCATION" value="fbio" />
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
      <div className="FormElement">
        <label>
          Which tags fit your offer?
          <Multiselect
            options={tags.offerTags}
            displayValue="name"
            // groupBy="category"
          />
        </label>
      </div>
      {/* TAGS */}
      {/* <div className="FormElement">
        <label> </label>
        <div>
          <label>
            <Field type="checkbox" component="input" name="freg" value="freg" />
            Food regional
          </label>
          <label>
            <Field type="checkbox" component="input" name="fbio" value="fbio" />
            Food organic
          </label>
          <label>
            <Field type="checkbox" component="input" name="drug" value="drug" />
            Drugstore product
          </label>
          <label>
            <Field type="checkbox" component="input" name="kle" value="kle" />
            Clothes
          </label>
          <label>
            <Field type="checkbox" component="input" name="altene" value="mob" />
            Alternative energy
          </label>
          <label>
            <Field type="checkbox" component="input" name="nat" value="nat" />
            Natur
          </label>
          <label>
            <Field type="checkbox" component="input" name="ges" value="ges" />
            Health
          </label>
          <label>
            <Field type="checkbox" component="input" name="ene" value="ene" />
            Energy
          </label>{" "}
          <label>
            <Field type="checkbox" component="input" name="save" value="ene" />
            Energy saving
          </label>
          <label>
            <Field type="checkbox" component="input" name="heat" value="ene" />
            Heating
          </label>
          <label>
            <Field type="checkbox" component="input" name="hh" value="hh" />
            Household product
          </label>
          <label>
            <Field type="checkbox" component="input" name="sh" value="sh" />
            Second Hand
          </label>
          <label>
            <Field type="checkbox" component="input" name="freg" value="freg" />
            Food regional
          </label>
          <label>
            <Field type="checkbox" component="input" name="shar" value="fbio" />
            Sharing
          </label>
          <label>
            <Field type="checkbox" component="input" name="car" value="drug" />
            Car
          </label>
          <label>
            <Field type="checkbox" component="input" name="bike" value="kle" />
            Bike
          </label>
          <label>
            <Field type="checkbox" component="input" name="nutr" value="mob" />
            Nutrition
          </label>
          <label>
            <Field type="checkbox" component="input" name="mheal" value="nat" />
            Mental Health
          </label>
          <label>
            <Field type="checkbox" component="input" name="pheal" value="ges" />
            Physical Health
          </label>
          <label>
            <Field type="checkbox" component="input" name="natur" value="ene" />
            Nature
          </label>
          <label>
            <Field type="checkbox" component="input" name="workshop" value="hh" />
            Workshop
          </label>
          <label>
            <Field type="checkbox" component="input" name="talk" value="sh" />
            Talk
          </label>
          <label>
            <Field type="checkbox" component="input" name="excurs" value="mob" />
            Excursion
          </label>
        </div>
      </div> */}

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

      <Condition when="offerType" is="SHOP">
        <Field name="openingTimes">
          {({ input, meta }) => (
            <div className="FormElement">
              <label htmlFor="openingTimes">Opening Times </label>
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
      </Condition>

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
      <Field name="link">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="link">Your Website</label>
            <br />
            <input {...input} id="link" component="input" placeholder="https://" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
      <div className="FormElement">
        <label htmlFor="logo">Upload your image or logo</label>
        <FileField type="file" id="file" name="logo" />
      </div>
      <br />
      <div className="FormElement">
        <label htmlFor="submit"></label>
        <input type="submit" name="submit" id="submit" value="Let's go!" />
      </div>
    </Form>
  )
}

// /* Unused parts of original code
