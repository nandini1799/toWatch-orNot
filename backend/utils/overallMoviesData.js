const { YEARS } = require('./constants')

//! IMDB Rating Heatmap
exports.getIMDBRatingHeatMap = (allMovies) => {
  const map = {}
  allMovies.forEach((e) => {
    if (!e['IMDb Rating']) {
    } else {
      if (map[Math.round(e['IMDb Rating'])]) {
        map[Math.round(e['IMDb Rating'])] = {
          ...map[Math.round(e['IMDb Rating'])],
          [e.Year]: map[Math.round(e['IMDb Rating'])][e.Year] ? map[Math.round(e['IMDb Rating'])][e.Year] + 1 : 1
        }
      } else {
        map[Math.round(e['IMDb Rating'])] = {
          [e.Year]: 1
        }
      }
    }
  })
  return map
}

//! Genere Shift over years
exports.getGenereShiftOverYears = (allMovies) => {
  const map = {}
  allMovies.forEach((e) => {
    if (map[e.Year]) {
      map[e.Year] = {
        ...map[e.Year],
        [e['Primary Genre']]: map[e.Year][e['Primary Genre']] ? map[e.Year][e['Primary Genre']] + 1 : 1
      }
    } else {
      map[e.Year] = { [e['Primary Genre']]: 1 }
    }
  })
  return map
}

//! Runtime Shift over years
exports.getRuntimeShiftOverYears = (allMovies) => {
  const map = {}

  allMovies.forEach((e) => {
    const currentRuntime = e.runtime === '--' || e.runtime === 'N/A' ? 0 : parseInt(e.runtime)
    if (map[e.Year]) {
      map[e.Year] = {
        ...map[e.Year],
        [e['Primary Genre']]: {
          totalMovies: map[e.Year][e['Primary Genre']]
            ? !!currentRuntime
              ? map[e.Year][e['Primary Genre']].totalMovies + 1
              : map[e.Year][e['Primary Genre']].totalMovies
            : 1,
          totalRuntime: map[e.Year][e['Primary Genre']]
            ? map[e.Year][e['Primary Genre']].totalRuntime + currentRuntime
            : currentRuntime
        }
      }
    } else {
      map[e.Year] = { [e['Primary Genre']]: { totalMovies: !!currentRuntime ? 1 : 0, totalRuntime: currentRuntime } }
    }
  })
  return map
}

//! All movies by imdb and release date
exports.getAllMoviesByImdbAndReleaseDate = (allMovies) => {
  // return allMovies.map((e) => {
  //   return {
  //     imdb: e['IMDb Rating'],
  //     releaseDate: e.releaseDate,
  //     name: e.Film,
  //     year: e.Year
  //   }
  // })

  const arr2 = []
  YEARS.forEach((e) => {})

  const arr = []
  allMovies.forEach((e, i) => {
    // if (i < 200) {
    arr.push({
      imdb: e['IMDb Rating'],
      releaseDate: e.releaseDate,
      name: e.Film,
      year: e.Year
    })
    // }
  })
  return arr
}
