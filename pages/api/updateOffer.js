import nextConnect from "next-connect"
import multer from "multer"
import { nanoid } from "nanoid"
import { getSession } from "@blitzjs/auth"
import db from "db"
import { unlink } from "node:fs/promises"
import { UpdateOffer } from "app/offers/validation"

const upload = multer({
  storage: multer.diskStorage({
    destination: process.env.IMAGE_UPLOAD_URL,
    filename: nameGenerator,
  }),
  limits: {
    fileSize: 1e7,
  },
  fileFilter: uploadFilter,
})

/**
 * Filters the files to upload and rejects all other than images
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 * @returns
 */
function uploadFilter(req, file, cb) {
  let nameAndExtension = file.originalname.split(".")

  // make sure logo is in a allowed file format (at least it has the right extension)
  if (
    nameAndExtension.length > 1 &&
    ["jpg", "png", "gif", "svg"].indexOf(nameAndExtension[nameAndExtension.length - 2] >= 0)
  ) {
    cb(null, true)
    return
  }

  // reject all other files
  cb(null, false)
}

/**
 * Generates a new random name for the file to upload
 * @param {*} req
 * @param {*} file
 * @param {*} cb
 */
function nameGenerator(req, file, cb) {
  let nameAndExtension = file.originalname.split(".")
  cb(null, nanoid() + "." + nameAndExtension[nameAndExtension.length - 1])
}

const updateOffer = nextConnect({
  async onError(error, req, res) {
    if (req.file) {
      await unlink(req.file.path)
    }
    res.status(501).json({ error: `Sorry something Happened! ${error.message}` })
  },
  onNoMatch(req, res) {
    // handle invalid HTTP method requests
    res.status(405).json({ error: `Method '${req.method}' not allowed` })
  },
})

updateOffer
  .use(async (req, res, next) => {
    const session = await getSession(req, res)
    if (session.userId === null) {
      throw new Error("Authentication error!")
    } else {
      next()
    }
  })
  .use(upload.single("logo"))
  .post(async (req, res) => {
    // req.file.path => contains the full image path and extension
    const session = await getSession(req, res)

    console.log(req.body)
    // mak an object and validate the content
    let values = UpdateOffer.safeParse(JSON.parse(JSON.stringify(req.body)))

    if (values.success === true) {
      // add server side values to the dataset
      values.data = {
        ...values.data,
        logo: req.file ? req.file.filename : undefined,
      }

      const offer = await db.offer.update({
        where: {
          id: values.data.id,
        },
        data: values.data,
      })
      console.log(offer)
      res.status(200).json({ data: "sucess", offer: offer })
    } else {
      // TODO: remove uploaded fiel
      if (req.file) {
        await unlink(req.file.path)
      }
      res.status(400).json({ data: "failed", error: values.error })
    }
  })

export default updateOffer

export const config = {
  api: {
    bodyParser: false,
  },
}
