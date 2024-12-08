import pg from "pg"
const { Client } = pg

const password = process.env.POSTGRES_PASSWORD
const db = process.env.POSTGRES_DB
const user = process.env.POSTGRES_USER

const client = new Client({
  user,
  database: db,
  password: password,
  host: "postgres-service",
})

export default client
