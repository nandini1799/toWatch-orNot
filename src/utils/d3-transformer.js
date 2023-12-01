import { GENRE, YEARS } from "./constants";

export const transformByAudienceTypeData = (data) => {
	const a = Object.keys(data)
		.map((e) => ({
			x: parseInt(e.split(":")[0]),
			y: data[e],
		}))
		.sort((a, b) => a.x - b.x);
	return a;
};

export const transformTop10MoviesByRevenueTypeData = (data) => {
	return data
		.map((e) => ({
			...e,
			openingWeekend: parseFloat(e["openingWeekend"]) ?? 0,
			worldwideGross: parseFloat(e["worldwideGross"]) ?? 0,
		}))
		.sort((a, b) => parseInt(a.RTRating) - parseInt(b.RTRating));
};

export const transformImdbHeatMapData = (data) => {
	const newData = [];
	Object.keys(data).forEach((k) => {
		YEARS.forEach((e) => {
			newData.push({ x: e, y: k, value: data[k][e] ?? 0 });
		});
	});

	return newData;
};

export const transformShiftDataChange = (data, isRuntimeShift) => {
	let newData = [];
	GENRE.forEach((g) => {
		let genreObject = {};
		Object.keys(data).forEach((y) => {
			genreObject = {
				...genreObject,
				name: g,
				[y]:
					isRuntimeShift && data[y][g]
						? data[y][g].totalRuntime / data[y][g].totalMovies ?? 0
						: data[y][g] ?? 0,
			};
		});
		newData.push({ ...genreObject });
	});
	return newData;
};

export const transformMoviesForYearWiseChart = (data) => {
	return data.map((e) => ({
		imdb: e["IMDb Rating"],
		releaseDate: e.releaseDate,
		name: e.Film,
		year: e.Year,
		poster: e.posterLink,
		director: e.director,
		genres: e.Genres,
		availableHere: e.Link,
	}));
};
