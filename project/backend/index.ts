import express, { Request } from "express"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import axios from "axios"
import crypto from "crypto"
import cors from "cors"
import bodyParser from "body-parser"

const directory = path.join(__dirname, "usr", "src", "app", "files")
const filePath = path.join(directory, "img.jpg")
const cacheTtl = 60 * 60 * 1000

type PostTodo = {
  name: string
}

dotenv.config()

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

let HARDCODED_TODOS = [
  {
    id: crypto.randomUUID(),
    name: "First todo",
  },
  {
    id: crypto.randomUUID(),
    name: "Second todo",
  },
]

console.log("Trying to get the appp running: ", port)

// Not the safest config, but good enough for now
app.use(cors())
app.use(bodyParser.json())

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

app.get("/api", async (_req, res) => {
  await validateImageExistance()
  res.sendFile(filePath)
})

app.get("/api/todos", async (_res, res) => {
  res.json(HARDCODED_TODOS)
})

app.post("/api/todos", async (req: Request<{}, {}, PostTodo>, res) => {
  const todo = req.body.name
  const newTodo = { id: crypto.randomUUID(), name: todo }
  HARDCODED_TODOS = [newTodo, ...HARDCODED_TODOS]

  res.json(newTodo)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
