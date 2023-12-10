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

export const shiftDataChange = (data, isRuntimeShift) => {
	let newData = [];
	GENRE.forEach((g) => {
		let genreObject = {};
		Object.keys(data).forEach((y) => {
			genreObject = {
				...genreObject,
				name: g,
				[y]:
					isRuntimeShift && data[y][g]
						? data[y][g].totalRuntime / data[y][g].totalMovies ?? 100
						: data[y][g] ?? 0,
			};
		});
		newData.push({ ...genreObject });
	});
	return newData;
};

export const transformShiftDataChange = (data, isRuntimeShift) => {
	let pointCoordinate = [];
	GENRE.forEach((g) => {
		Object.keys(data).forEach((k) => {
			pointCoordinate.push({
				x: +k,
				y:
					isRuntimeShift && data[k][g]
						? data[k][g].totalRuntime / data[k][g].totalMovies ?? 0
						: data[k][g] ?? 0,
				g,
			});
		});
	});
	return pointCoordinate;
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

export const transformPieChartDataToShowGivenColorsOnly = (
	data,
	numberOfColors
) => {
	const mainVisibleData = data
		.sort((a, b) => b.value - a.value)
		.filter((e, i) => i < numberOfColors)
		.map((e) => {
			return e.id === "based on a true story"
				? { ...e, id: "true story", label: "true story" }
				: { ...e };
		});

	const others = data
		.filter((e, i) => i >= numberOfColors)
		.reduce(
			(acc, curr) => {
				return { id: "others", label: "others", value: acc.value + curr.value };
			},
			{ id: "others", label: "others", value: 0 }
		);

	return [...mainVisibleData, others];
};
