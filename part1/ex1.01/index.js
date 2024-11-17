import crypto from "crypto"
import express from "express"

const app = express()
const port = 3000

function main() {
  const newUUID = crypto.randomUUID()
  return `${new Date().toISOString()}, ${newUUID}`
}

app.get("/", (_req, res) => {
  const string = main()
  res.send(string)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
