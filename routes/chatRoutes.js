const express = require("express")
const router = express.Router()
const { chat } = require("../controllers/chatController")
const apiKeyAuth = require("../middleware/apiKeyAuth")

router.post("/chat", apiKeyAuth, chat)

module.exports = router
