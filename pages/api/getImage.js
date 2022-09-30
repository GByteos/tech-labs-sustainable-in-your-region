import fs from "fs"
import path, { resolve } from "path"
import nextConnect from "next-connect"

const getImage = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    // handle invalid HTTP method requests
    res.status(405).json({ error: `Method '${req.method}' not allowed` })
  },
})

getImage.get(async (req, res) => {
  console.log(req.query.imageId)

  if (req.query.imageId === undefined) {
    throw new Error("No image id was specified")
  } else {
    res.setHeader("Content-Type", "image/jpg")

    const filePath = path.resolve("./public/uploads/", req.query.imageId)
    const imageBuffer = fs.createReadStream(filePath)

    await new Promise(function (resolve) {
      imageBuffer.pipe(res)
      imageBuffer.on("end", resolve)
      imageBuffer.on("error", function (err) {
        if (err.code === "ENOENT") {
          throw new Error("Image not found")
        } else {
          throw new Error("Stream error")
        }
      })
    })
  }
})

export default getImage
