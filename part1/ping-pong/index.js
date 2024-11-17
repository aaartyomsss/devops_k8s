import express from "express"

const app = express()
const port = 4000
let counter = 0

app.get("/pingpong", (_req, res) => {
  const currentCount = counter
  counter++
  res.send(`${currentCount}`)
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})
