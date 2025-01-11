import express from "express"
import fs from "fs"
import path from "path"
import dotenv from "dotenv"
import client from "./services/dbPool.js"
import { addCount } from "./queries/count.js"

dotenv.config()
await client.connect()

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "count.txt")

const app = express()
const port = 4000
let count = 0

client.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database:", err)
  } else {
    console.log("Database connection successful:", res.rows[0])
  }
})

const createTableQuery = `
      CREATE TABLE IF NOT EXISTS count (
        id SERIAL PRIMARY KEY,
        count INTEGER 
      );
    `

client.query(createTableQuery, (err, res) => {
  if (err) {
    console.error("Error creating table: ", err)
  } else {
    console.log("Created ", res)
  }
})

// TODO: Deprecated as per 2.01 instructions
// const getCount = () => {
//   try {
//     const file = fs.readFileSync(filePath, { encoding: "utf-8" })
//     return file
//   } catch (error) {
//     console.log(error)
//     return "0"
//   }
// }

const getCount = async () => {
  const res = await client.query(`SELECT COUNT(*) FROM COUNT;`)
  console.log("Get count res: ", res)
  return res.rows[0].count
}

const writeCount = async () => {
  const currentCount = await getCount()
  await client.query(addCount)
  return currentCount
}

app.get("/pingpong", async (_req, res) => {
  const count = await writeCount()
  res.send(`${count}`)
})

app.get("/", async (_, res) => {
  res.status(200).end()
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
