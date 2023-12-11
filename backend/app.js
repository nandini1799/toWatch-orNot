const express = require('express')
require('dotenv').config()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const moviesRoute = require('./routes/movies')

const PORT = process.env.PORT || 3003
const app = express()
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type,Authorization')
  next()
})
app.use(bodyParser.json())
app.use('/movies', moviesRoute)

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500
  const errorMessage = err.message || 'something went wrong!'
  const errorData = err.data || 'something went wrong!'
  res.status(statusCode).json({ message: errorMessage, data: errorData })
})

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('starting the server.....')
    app.listen(PORT)
  })
  .catch((err) => {
    console.log('something went wrong:::', JSON.stringify(err))
  })
