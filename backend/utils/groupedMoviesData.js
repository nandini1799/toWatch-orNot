//! PIE CHART DATA GETTER FUNCTION
exports.getScriptTypePieChartDistributionData = (movieData) => {
  const pieMap = new Map()
  movieData.forEach((e) => {
    if (pieMap.has(e['Script Type'])) {
      pieMap.set(e['Script Type'], pieMap.get(e['Script Type']) + 1)
    } else {
      pieMap.set(e['Script Type'], 1)
    }
  })

  const generatedObj = Object.fromEntries(pieMap.entries())
  const totalMovies = movieData.length

  return Object.keys(generatedObj).map((e) => ({
    id: e || 'others',
    label: e || 'others',
    value: generatedObj[e],
    percentage: (generatedObj[e] / totalMovies) * 100
  }))
}

//! Group bar Chart domestic vs international
//TODO: add domestic international NaN condition separately
exports.getRevenueGroupBarChartDistributionData = (movieData) => {
  const map = new Map()

  movieData.forEach((e) => {
    if (isNaN(e['Domestic gross ($million)']) || isNaN(e['Foreign Gross ($million)'])) {
    } else {
      if (map.has(e['Primary Genre'])) {
        map.set(e['Primary Genre'], {
          totalMovies: ++map.get(e['Primary Genre']).totalMovies,
          domestic: parseFloat(map.get(e['Primary Genre']).domestic) + parseFloat(e['Domestic gross ($million)']),
          international:
            parseFloat(map.get(e['Primary Genre']).international) + parseFloat(e['Foreign Gross ($million)'])
        })
      } else {
        map.set(e['Primary Genre'], {
          totalMovies: 1,
          domestic: parseFloat(e['Domestic gross ($million)']),
          international: parseFloat(e['Foreign Gross ($million)'])
        })
      }
    }
  })

  return Object.fromEntries(map.entries())
}

//!Bar Graph based on the audience deviance
exports.getAudienceCriticsDevienceDistributionData = (movieData) => {
  const obj = {}
  movieData.forEach((e) => {
    if (isNaN(e['Audience vs Critics deviance'])) {
    } else {
      const rangeHelper =
        parseInt(e['Audience vs Critics deviance']) - (parseInt(e['Audience vs Critics deviance']) % 10)

      if (rangeHelper > 0) {
        const key = `${rangeHelper}:${rangeHelper + 10}`
        isNaN(obj[key]) ? (obj[key] = 1) : (obj[key] = obj[key] + 1)
      } else {
        const key = `${rangeHelper - 10}:${rangeHelper}`
        isNaN(obj[key]) ? (obj[key] = 1) : (obj[key] = obj[key] + 1)
      }
    }
  })
  return obj
}

//!dataset for worldwide income, rotten tomato and opening week
exports.getTop10WorldWideAndOpeningGrossWithRT = (movieData) => {
  const top10WorldWideGrossMoviesData = movieData
    .filter((e) => !(e['Opening weekend ($million)'] === '-' || e['Worldwide Gross ($million)'] === '-'))
    .sort((a, b) => parseFloat(b['Worldwide Gross ($million)']) - parseFloat(a['Worldwide Gross ($million)']))
    .filter((_, i) => i < 10)
  return top10WorldWideGrossMoviesData.map((e) => ({
    _id: e._id,
    label: e.Film,
    openingWeekend: e['Opening weekend ($million)'] === '-' ? 0 : e['Opening weekend ($million)'],
    worldwideGross: e['Worldwide Gross ($million)'] === '-' ? 0 : e['Worldwide Gross ($million)'],
    RTRating: e['Rotten Tomatoes  critics']
  }))
}
