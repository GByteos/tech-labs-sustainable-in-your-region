import fs from "fs"
import path, { resolve } from "path"
import nextConnect from "next-connect"

const getImage = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
    res.end()
  },
  onNoMatch(req, res) {
    // handle invalid HTTP method requests
    res.status(405).json({ error: `Method '${req.method}' not allowed` })
    res.end()
  },
})

getImage.get(async (req, res) => {
  if (req.query.imageId === undefined) {
    throw new Error("No image id was specified")
  } else {
    const imageNameParts = req.query.imageId.split(".")
    let contentType
    switch (imageNameParts[imageNameParts.length - 1].toLowerCase()) {
      case "jpg":
        contentType = "image/jpg"
        break
      case "gif":
        contentType = "image/gif"
        break
      case "jpeg":
        contentType = "image/jpeg"
        break
      case "png":
        contentType = "image/png"
        break
      case "tiff":
        contentType = "image/tiff"
        break
      case "svg":
        contentType = "image/svg+xml"
        break

      default:
        throw new Error("Unspported file type")
    }
    res.setHeader("Content-Type", contentType)

    const filePath = path.resolve(process.env.IMAGE_UPLOAD_URL, req.query.imageId)
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
