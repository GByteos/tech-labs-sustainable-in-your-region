import multer from "multer"
import { nanoid } from "nanoid"

const imageUpload = multer({
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

export default imageUpload
