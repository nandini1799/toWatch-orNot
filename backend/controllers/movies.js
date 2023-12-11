const Movie = require('../models/movie')
const gorupedData = require('../utils/groupedMoviesData')
const overallData = require('../utils/overallMoviesData')
// movies/2007 => {
// movies:[]
// byScriptType:{},
// byGenereType:{},
// byScriptType:{},
// }

exports.getMoviesByYear = async (req, res, next) => {
  const { params } = req
  try {
    const movies = await Movie.find({ Year: +params.year })
    const byScriptType = gorupedData.getScriptTypePieChartDistributionData(movies)
    const top10WorldWideGross = gorupedData.getTop10WorldWideAndOpeningGrossWithRT(movies)
    const byAudienceType = gorupedData.getAudienceCriticsDevienceDistributionData(movies)
    const byRevenueType = gorupedData.getRevenueGroupBarChartDistributionData(movies)
    res.status(200).json({ movies, byAudienceType, byScriptType, byRevenueType, top10WorldWideGross })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getMoviesOverallSummary = async (req, res, next) => {
  try {
    const allMovies = await Movie.find().lean()
    const heatMapIMDB = overallData.getIMDBRatingHeatMap(allMovies)
    const genreShift = overallData.getGenereShiftOverYears(allMovies)
    const runtimeShift = overallData.getRuntimeShiftOverYears(allMovies)
    res.status(200).json({ heatMapIMDB, genreShift, runtimeShift })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}

exports.getAllMoviesStaticGraphData = async (req, res, next) => {
  try {
    const allMovies = await Movie.find().lean()
    const allMoviesByImdbAndReleaseDate = overallData.getAllMoviesByImdbAndReleaseDate(allMovies)
    res.status(200).json({ allMoviesByImdbAndReleaseDate })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
  }
}
