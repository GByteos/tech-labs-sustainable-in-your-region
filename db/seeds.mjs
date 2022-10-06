//import db from "db"
import db from "./index.js"

/*
 * This seed function is executed when you run `blitz db seed`.
 *
 * Probably you want to use a library like https://chancejs.com
 * to easily generate realistic data.
 */
const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
  console.log("Hello")
  await db.offerTag.create({ data: { name: "Food" } })
  const test = await db.offer.create({
    data: {
      name: "Test",
      description: "Description",
      authorId: 1,
    },
  })
  console.log(test)
}

export default seed
