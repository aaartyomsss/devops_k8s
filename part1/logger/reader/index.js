import crypto from "crypto"
import express from "express"
import fs from "fs"
import path from "path"

const directory = path.join("/", "usr", "src", "app", "files")
const filePath = path.join(directory, "log.txt")
const countPath = path.join(directory, "count.txt")

const app = express()
const port = 3000

const getStamp = () => {
  const file = fs.readFileSync(filePath, { encoding: "utf-8" })
  return file
}

const getCount = async () => {
  console.log("Calling get count ! ! ! !")
  const res = await fetch("http://ping-pong-svc:4444/pingpong")
  console.log("Got response: ", res)
  const json = await res.json()
  // const file = fs.readFileSync(countPath, { encoding: "utf-8" })
  console.log("Json: ", json)
  return json
}

app.get("/", async (_req, res) => {
  console.log("Getting a string from file")
  const string = getStamp()
  const count = await getCount()
  console.log("Got string from file: ", string)
  const _res = `${string} \n Ping / Pongs ${count}`
  res.send(_res)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
