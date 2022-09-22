import nextConnect from "next-connect"
import multer from "multer"

const upload = multer({
  storage: multer.diskStorage({
    destination: "././public/uploads",
  }),
})

const imageUpload = nextConnect({
  onError(error, req, res) {
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    // handle invalid HTTP methode requests
    res.status(405).json({ error: `Method '${req.method}' not allowed` })
  },
})

imageUpload.use(upload.single("logo"))

imageUpload.post((req, res) => {
  console.log("Route image upload called")
  res.status(200).json({ data: "sucess" })
})

export default imageUpload

export const config = {
  api: {
    bodyParser: false,
  },
}
