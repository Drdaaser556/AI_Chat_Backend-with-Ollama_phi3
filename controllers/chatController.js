const axios = require("axios")
const Chat = require("../models/Chat")

exports.chat = async (req, res) => {
  const prompt = req.body.prompt
  if (!prompt) return res.status(400).json({ msg: "Prompt required" })

  try {
    // Ollama local API
    const response = await axios.post("http://localhost:11434/api/generate", {
      // model: "tinyllama", 
      model: "phi3", 
      prompt,
      stream: false
    })

    // ✅ Fixed: Ollama returns { response: "..." } not results[0].text
    const text = response.data?.response || "No response"

    // Save to MongoDB
    const chat = new Chat({ prompt, response: text })
    await chat.save()

    res.json({ response: text })

  } catch (err) {
    console.error(err.message)
    res.status(500).json({ msg: "AI Server Error: " + err.message })
  }
}
