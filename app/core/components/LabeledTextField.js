import { forwardRef } from "react"
import { useField } from "react-final-form"


// eslint-disable-next-line react/display-name
export const LabeledTextField = forwardRef(
  ({ name, label, outerProps, fieldProps, labelProps, ...props }, ref) => {
    const {
      input,
      meta: { touched, error, submitError, submitting },
    } = useField(name, {
      parse:
        props.type === "number"
          ? Number // Converting `""` to `null` ensures empty values will be set to null in the DB
          : (v) => (v === "" ? null : v),
      ...fieldProps,
    })
    const normalizedError = Array.isArray(error) ? error.join(", ") : error || submitError
    return (
      <div {...outerProps}>
        <label {...labelProps}>
          {label}
          <input {...input} disabled={submitting} {...props} ref={ref} />
        </label>

        {touched && normalizedError && (
          <div
            role="alert"
            style={{
              color: "red",
            }}
          >
            {normalizedError}
          </div>
        )}

       
      </div>
    )
  }
)
export default LabeledTextField
