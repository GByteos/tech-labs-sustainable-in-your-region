import { Form } from "app/core/components/Form"
import { Field } from "react-final-form"
import { FileField } from "app/core/components/FileField"
//import styles from "pages/styles/OfferForm.module.css"
export { FORM_ERROR } from "app/core/components/Form"
export function OfferForm(props) {
  return (
    <Form {...props} className="footform">
      <div className="FormElement">
        <label htmlFor="offerType">What type of offer do you have?</label>
        <br />
        <Field id="offerType" name="offerType" component="select" defaultValue="SHOP">
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
            <input {...input} type="text" id="name" cols="30" placeholder="Title of my offer" />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

      <Field name="description">
        {({ input, meta }) => (
          <div className="FormElement">
            <label htmlFor="description">Please give here a description of your offer: </label>
            <br />
            <input
              className="descriptionInput"
              {...input}
              type="textarea"
              id="sonst"
              cols="30"
              rows="10"
              placeholder="Description"
            />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>

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

/* Unused parts of original code
<label> In welchen Bereich passt dein Angebot?</label>
            <ul>
              <li>
                <input type="checkbox" name="lmr" id="lmr" value="lmr" />
                <label htmlFor="lmr">Lebensmittel regional</label>
              </li>
              <li>
                <input type="checkbox" name="lmb" id="lmb" value="lmb" />
                <label htmlFor="lmb">Lebensmittel bio</label>
              </li>
              <li>
                <input type="checkbox" name="dro" id="dro" value="dro" />
                <label htmlFor="dro">Drogerieartikel</label>
              </li>
              <li>
                <input type="checkbox" name="kle" id="kle" value="kle" />
                <label htmlFor="kle">Kleidung</label>
              </li>
              <li>
                <input type="checkbox" name="mob" id="mob" value="mob" />
                <label htmlFor="mob">Mobilität</label>
              </li>
              <li>
                <input type="checkbox" name="nat" id="nat" value="nat" />
                <label htmlFor="nat">Natur</label>
              </li>
              <li>
                <input type="checkbox" name="ges" id="ges" value="ges" />
                <label htmlFor="ges">Gesundheit</label>
              </li>
              <li>
                <input type="checkbox" name="ene" id="ene" value="ene" />
                <label htmlFor="ene">Energie</label>
              </li>
              <li>
                <input type="checkbox" name="hh" id="hh" value="hh" />
                <label htmlFor="hh">Haushalt</label>
              </li>
              <li>
                <input type="checkbox" name="sh" id="sh" value="ink" />
                <label htmlFor="sh">Second Hand</label>
              </li>
            </ul>
*/
