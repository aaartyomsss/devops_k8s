import crypto from "crypto"
import express from "express"
import fs from "fs"
import path from "path"

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "log.txt")

const app = express()
const port = 3001

const writeStamp = () => {
  console.log("Generating!")
  const string = crypto.randomUUID()
  const file = fs.writeFileSync(filePath, string, { encoding: "utf-8" })
  return file
}

app.get("/", (_req, res) => {
  res.send("Writer app should work")
})

setInterval(writeStamp, 5000)

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
