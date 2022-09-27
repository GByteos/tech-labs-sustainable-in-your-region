import fs from "fs"
import path from "path"
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

getImage.get((req, res) => {
  console.log(req.query.imageId)
  if (req.query.imageId === undefined) {
    throw new Error("No image id was specifyied")
  } else {
    const filePath = path.resolve("./public/uploads/", req.query.imageId)
    const imageBuffer = fs.readFileSync(filePath)

    res.setHeader("Content-Type", "image/jpg")
    res.send(imageBuffer)
  }
})

export default getImage
