const express = require('express')
const notesRouter = require("./routes/notes");
const blogsRouter = require("./routes/blogs");
const app = express()

app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)

const PORT = process.env.PORT || 3000
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})