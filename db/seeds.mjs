//import db from "db"
import db from "./index.mjs"
import { SecurePassword } from "@blitzjs/auth"
import { faker } from "@faker-js/faker"

const OFFERS_TO_SEED = 50

const seed = async () => {
  // general variable, used for output
  let seededData

  // set localisation
  faker.setLocale("de")

  // seeding basic tags
  seededData = await db.offerTag.createMany({
    data: [
      { name: "Food regional", category: ["CONSUME", "HEALTH"] },
      { name: "Food organic", category: ["CONSUME", "HEALTH"] },
      { name: "Drugstore product", category: ["CONSUME", "HEALTH"] },
      { name: "Clothes", category: ["CONSUME", "HEALTH"] },
      { name: "Alternative energy", category: ["CONSUME", "ENERGY"] },
      { name: "Nature", category: ["HEALTH", "EDUCATION"] },
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
      { name: "Workshop", category: ["EDUCATION"] },
      { name: "Talk", category: ["EDUCATION"] },
      { name: "Excursion", category: ["INCLUSIVITY", "EDUCATION"] },
    ],
  })
  console.log(seededData)

  // seed an admin and an normal user
  const hashedPassword = await SecurePassword.hash("sustainability")

  seededData = await db.user.create({
    data: {
      email: "admin@admin.com",
      hashedPassword,
      role: "ADMIN",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  console.log(seededData)

  seededData = await db.user.create({
    data: {
      email: "user@user.com",
      hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  seededData = await db.user.create({
    data: {
      email: "user2@user.com",
      hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  seededData = await db.user.create({
    data: {
      email: "user3@user.com",
      hashedPassword,
      role: "USER",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  seededData = await db.user.create({
    data: {
      email: "moderator@moderator.com",
      hashedPassword,
      role: "MODERATOR",
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
    },
  })

  // seed some offers
  console.log(seededData)
  for (let i = 0; i < OFFERS_TO_SEED; i++) {
    seededData = await db.offer.create({
      data: {
        name: faker.company.name(),
        description: faker.lorem.paragraphs(),
        link: "https://www." + faker.internet.domainName(),
        authorId: faker.helpers.arrayElement([1, 2, 3, 4, 5]),
        email: faker.internet.email(),
        street: faker.address.streetAddress(),
        zip: faker.address.zipCode(),
        city: faker.address.city(),
        tel: faker.phone.number(),
        offerType: faker.helpers.arrayElement(["SHOP", "EVENT"]),
        offerTags: {
          connect: faker.helpers.arrayElements(
            [
              { id: 1 },
              { id: 2 },
              { id: 3 },
              { id: 4 },
              { id: 5 },
              { id: 6 },
              { id: 7 },
              { id: 8 },
              { id: 9 },
              { id: 10 },
              { id: 11 },
              { id: 12 },
              { id: 13 },
              { id: 14 },
              { id: 15 },
              { id: 16 },
              { id: 17 },
              { id: 18 },
              { id: 19 },
              { id: 20 },
              { id: 21 },
            ],
            3
          ),
        },
      },
    })
    console.log(seededData)
  }
}

seed()
