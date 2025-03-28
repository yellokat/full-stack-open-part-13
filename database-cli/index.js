const express = require('express')
const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')
require('express-async-errors');

const app = express()

const notesRouter = require("./controllers/notes");
const blogsRouter = require("./controllers/blogs");
const {errorHandler} = require("./util/middleware");

app.use(express.json())
app.use('/api/notes', notesRouter)
app.use('/api/blogs', blogsRouter)
app.use(errorHandler)

const start = async () => {
  await connectToDatabase()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()