import { Field } from "react-final-form"
import React, { useState } from "react"
import Image from "next/image"
import YL from "public/yourlogo.png"

export const FileField = ({ name, initialValue, ...props }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  console.log(initialValue)
  return (
    <div>
      {(() => {
        if (initialValue !== "" && !selectedImage) {
          return (
            <Image
              className="displaylogo"
              src={"/api/getImage?imageId=" + initialValue}
              alt="Offer Logo"
              width="250px"
              height="250px"
            />
          )
        } else {
          return (
            <Image
              alt="not fount"
              width={"250px"}
              height={"250px"}
              src={selectedImage ? URL.createObjectURL(selectedImage) : YL}
            />
          )
        }
      })()}
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
