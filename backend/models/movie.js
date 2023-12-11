const mongoose = require('mongoose')

const { Schema } = mongoose

const movieModel = new Schema({
  Film: { type: String, required: true, unique: true },
  Year: { type: Number, required: true },
  'Script Type': String,
  'Rotten Tomatoes  critics': String,
  'Metacritic  critics': String,
  'Average critics': String,
  'Rotten Tomatoes Audience': String,
  'Metacritic Audience': String,
  'Rotten Tomatoes vs Metacritic  deviance': String,
  'Average audience': String,
  'Audience vs Critics deviance': String,
  'Primary Genre': String,
  Genres: String,
  'Opening Weekend ($)': String,
  'Opening weekend ($million)': String,
  'Domestic Gross': String,
  'Domestic gross ($million)': String,
  'Foreign Gross ($million)': String,
  'Foreign Gross': String,
  'Worldwide Gross': String,
  'Worldwide Gross ($million)': String,
  '% of Gross earned abroad': String,
  'Budget ($million)': String,
  'Budget recovered': String,
  'Budget recovered opening weekend': String,
  'Oscar Winners': String,
  'Oscar Detail': String,
  Link: String,
  None: String,
  Distributor: String,
  'IMDb Rating': Number,
  'IMDB vs RT disparity': String,
  'Release Date (US)': String,
  'financial source, if not The numbers': String,
  'film list here https:': String,
  runtime: String,
  posterLink: String,
  releaseDate: String,
  director: String
})

module.exports = mongoose.model('Movie', movieModel)

// "_id": {
//         "$oid": "6557b003fc107fb2ac3e7813"
//     },

// }
