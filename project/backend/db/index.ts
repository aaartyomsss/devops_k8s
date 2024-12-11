import pg from "pg"
import { first_migration } from "../migrations/1_create_table"
const { Client } = pg

const password = process.env.POSTGRES_PASSWORD
const db = process.env.POSTGRES_DB
const user = process.env.POSTGRES_USER

console.log("Having some issues: ", user)

const client = new Client({
  user,
  database: db,
  password: password,
  host: "postgres-service",
})

async function check() {
  try {
    await client.connect()
    console.log("Connected")
  } catch (error) {
    console.error("Failed to connect")
  }
}

check()

client.query(first_migration, (err, res) => {
  if (err) {
    console.error("Error migrating:", err)
  } else {
    console.log("No issues migrating DB")
  }
})

export default client
