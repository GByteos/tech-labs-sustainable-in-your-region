import nextConnect from "next-connect"
import { getSession } from "@blitzjs/auth"
import db from "db"
import { unlink } from "node:fs/promises"
import { UpdateOffer } from "app/offers/validation"
import imageUpload from "app/offers/components/imageUpload"
import path from "path"

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
  .use(imageUpload.single("logo"))
  .post(async (req, res) => {
    // req.file.path => contains the full image path and extension
    const session = await getSession(req, res)

    // make an object
    const rawValues = JSON.parse(JSON.stringify(req.body))

    // parse array of objects back
    if (rawValues.offerTags) rawValues.offerTags = JSON.parse(rawValues.offerTags)

    // validate
    let values = UpdateOffer.safeParse(rawValues)

    if (values.success === true) {
      // modify tags to be in connection prop
      if (values.data.offerTags) {
        values.data.offerTags = {
          connect: values.data.offerTags.map((tag) => {
            return { id: tag.id }
          }),
        }
      }

      // get old offer to do some checking and optimasation in db writing
      const oldOffer = await db.offer.findFirst({
        where: {
          id: values.data.id,
        },
      })

      // check if logo has been changed. If so, remove old file
      if (req.file && oldOffer.logo !== null) {
        await unlink(path.resolve(process.env.IMAGE_UPLOAD_URL, oldOffer.logo))
      }

      // add server side values to the dataset
      values = {
        ...values.data,
        logo: req.file ? req.file.filename : undefined,
      }

      const offer = await db.offer.update({
        where: {
          id: values.id,
        },
        data: values,
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
