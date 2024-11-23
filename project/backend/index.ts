import express from "express"
import dotenv from "dotenv"
import path from "path"
import fs from "fs"
import axios from "axios"

const directory = path.join(__dirname, "usr", "src", "app", "files")
const filePath = path.join(directory, "img.jpg")
const cacheTtl = 60 * 60 * 1000

dotenv.config()

const app = express()
const port = process.env.PORT ? parseInt(process.env.PORT) : 4000

console.log("Trying to get the appp running: ", port)

const fetchImage = async () => {
  const res = await axios.get("https://picsum.photos/1200", {
    responseType: "stream",
  })
  const dir = path.dirname(filePath)
  console.log("!!!!!!!!!!!!!!!!! ", dir)
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

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
