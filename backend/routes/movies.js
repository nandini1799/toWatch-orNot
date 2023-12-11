const express = require('express')
const movieController = require('../controllers/movies')
const route = express.Router()

route.get('/', movieController.getMoviesOverallSummary)

route.get('/all', movieController.getAllMoviesStaticGraphData)

route.get('/:year', movieController.getMoviesByYear)

module.exports = route
