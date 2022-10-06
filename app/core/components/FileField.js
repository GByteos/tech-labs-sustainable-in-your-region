import { Field } from "react-final-form"
import React, { useState } from "react"
import Image from "next/image"
import YL from "public/yourlogo.png"

export const FileField = ({ name, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  return (
    <div>
      <Image
        alt="not fount"
        width={"250px"}
        height={"250px"}
        src={selectedImage ? URL.createObjectURL(selectedImage) : YL}
      />
      {/* replace this with react-dropzone at some point */}
      <Field name={name}>
        {({ input: { value, onChange, ...input }, meta }) => (
          <div>
            <input
              {...input}
              type="file"
              onChange={(e) => {
                setSelectedImage(e.target.files[0])
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
