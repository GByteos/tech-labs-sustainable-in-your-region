//import db from "db"
import db from "./index.mjs"

const seed = async () => {
  // for (let i = 0; i < 5; i++) {
  //   await db.project.create({ data: { name: "Project " + i } })
  // }
  let seededData

  // seeding basic tags
  seededData = await db.offerTag.createMany({
    data: [
      { name: "Food regional", category: ["CONSUME", "HEALTH"] },
      { name: "Food organic", category: ["CONSUME", "HEALTH"] },
      { name: "Drugstore product", category: ["CONSUME", "HEALTH"] },
      { name: "Clothes", category: ["CONSUME", "HEALTH"] },
      { name: "Alternative energy", category: ["CONSUME", "ENERGY"] },
      { name: "Natur", category: ["HEALTH", "EDUCATION"] },
      { name: "Health", category: ["CONSUME", "HEALTH"] },
      { name: "Energy", category: ["CONSUME", "ENERGY"] },
      { name: "Energy saving", category: ["CONSUME", "ENERGY", "EDUCATION"] },
      { name: "Heating", category: ["CONSUME", "ENERGY"] },
      { name: "Household product", category: ["CONSUME"] },
      { name: "Second Hand", category: ["CONSUME"] },
      { name: "Sharing", category: ["CONSUME"] },
      { name: "Car", category: ["CONSUME"] },
      { name: "Bike", category: ["CONSUME"] },
      { name: "Nutrition", category: ["CONSUME", "HEALTH", "EDUCATION"] },
      { name: "Mental Health", category: ["HEALTH", "EDUCATION"] },
      { name: "Physical Health", category: ["HEALTH", "EDUCATION"] },
      { name: "Nature", category: ["CONSUME", "HEALTH"] },
      { name: "Workshop", category: ["EDUCATION"] },
      { name: "Talk", category: ["EDUCATION"] },
      { name: "Excursion", category: ["INCLUSIVITY", "EDUCATION"] },
    ],
  })
  console.log(seededData)
}

seed()
