import { Field } from "react-final-form"
import React, { useState } from "react"
import Image from "next/image"

export const FileField = ({ name, ...props }) => {
  const [selctedImage, setSelctedImage] = useState(null)

  return (
    <div>
      {selctedImage && (
        <Image
          alt="not fount"
          width={"250px"}
          height={"250px"}
          src={URL.createObjectURL(selctedImage)}
        />
      )}
      <Field name={name}>
        {({ input: { value, onChange, ...input }, meta }) => (
          <div>
            <input
              {...input}
              type="file"
              onChange={(e) => {
                setSelctedImage(e.target.files[0])
                onChange(e.target.files)
              }}
              {...props}
            />
            {meta.error && meta.touched && <span>{meta.error}</span>}
          </div>
        )}
      </Field>
    </div>
  )
}
