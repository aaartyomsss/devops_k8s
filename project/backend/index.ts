import express, { Request } from "express"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import axios from "axios"
import crypto from "crypto"
import cors from "cors"
import bodyParser from "body-parser"
import client from "./db"
import { addTodoQuery, getAllTodosQuery } from "./queries/todo"

const directory = path.join(__dirname, "usr", "src", "app", "files")
const filePath = path.join(directory, "img.jpg")
const cacheTtl = 60 * 60 * 1000

type PostTodo = {
  name: string
}

dotenv.config()

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

// Not the safest config, but good enough for now
app.use(cors())
app.use(bodyParser.json())
app.use((req, res, next) => {
  if (req.method === "POST") {
    console.log("----- TODO POSTED -----")
    console.log(req.body)
    console.log("-----------------------")
  }
  next()
})

const fetchImage = async () => {
  const res = await axios.get("https://picsum.photos/1200", {
    responseType: "stream",
  })
  const dir = path.dirname(filePath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  const writer = fs.createWriteStream(filePath)
  res.data.pipe(writer)

  await new Promise((resolve, reject) => {
    writer.on("finish", resolve)
    writer.on("error", reject)
  })
}

const validateImageExistance = async () => {
  if (!fs.existsSync(filePath)) {
    await fetchImage()
    return
  }
  const start = fs.statSync(filePath)
  const now = Date.now()
  if (now - start.mtimeMs > cacheTtl) {
    await fetchImage()
  }
}

// Health check endpoint
app.get("/", async (_, res) => {
  res.status(200).end()
})

app.get("/probe", async (_, res) => {
  console.log("Healthz")
  try {
    const _res = await client.query("SELECT 1;")
    console.log(_res.rows, "Result")
    res.status(200).json({ status: "ok" })
  } catch (error) {
    console.log("Health check error:", error)
    res.status(500).json({ error })
  }
})

app.get("/api", async (_req, res) => {
  await validateImageExistance()
  res.sendFile(filePath)
})

app.get("/api/todos", async (_res, res) => {
  const todos = await client.query<{ id: number; text: string; done: boolean }>(
    getAllTodosQuery()
  )
  res.json(todos.rows)
})

app.post("/api/todos", async (req: Request<{}, {}, PostTodo>, res) => {
  const todo = req.body.name
  if (todo.length > 140) {
    res.status(400).json({ error: "Too long of a todo name" })
    return
  }
  const rows = await client.query<{ id: number; text: string; done: boolean }>(
    addTodoQuery(todo)
  )
  console.log("New todo created !")
  res.json(rows.rows[0])
})

app.put(
  "/api/todos/:id",
  async (req: Request<{ id: string }, any, { done: boolean }>, res) => {
    const todoId = Number(req.params.id)
    const newValue = Boolean(req.body.done)
    const rows = await client.query(
      `UPDATE todo SET done = ${newValue} WHERE id = ${todoId}`
    )
    const updatedTodo = rows.rows[0]
    console.log("Updated: ", updatedTodo)
    res.json(updatedTodo)
  }
)

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
