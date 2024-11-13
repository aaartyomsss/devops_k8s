import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
const port = process.env.PORT

console.log("Trying to get the appp running: ", port)

app.get('/', (_req, res) => {
  res.send('Server is running!')
})

app.listen(port, () => {
  console.log(`Server started in port ${port}`)
})