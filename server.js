require("dotenv").config()
const express = require("express")
const cors = require("cors")
const connectDB = require("./config/db")
const chatRoutes = require("./routes/chatRoutes")

const app = express()
connectDB()

app.use(cors())
app.use(express.json())

app.use("/api", chatRoutes)

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT)
})

// curl -X POST http://localhost:5000/api/chat \
//   -H "Content-Type: application/json" \
//   -H "x-api-key: my-secret-key" \
//   -d '{"prompt":"Hello AI"}'
