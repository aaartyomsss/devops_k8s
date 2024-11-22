import express from "express"
import fs from "fs"
import path from "path"

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "count.txt")

const app = express()
const port = 4000

const getCount = () => {
  try {
    const file = fs.readFileSync(filePath, { encoding: "utf-8" })
    return file
  } catch (error) {
    console.log(error)
    return "0"
  }
}

const writeCount = () => {
  console.log("Generating!")
  const currentCount = parseInt(getCount())
  fs.writeFileSync(filePath, `${currentCount + 1}`, { encoding: "utf-8" })
  return currentCount
}

app.get("/pingpong", (_req, res) => {
  const count = writeCount()
  res.send(`${count}`)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
