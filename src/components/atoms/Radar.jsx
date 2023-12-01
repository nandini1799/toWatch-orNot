import * as d3 from "d3";
import { INNER_RADIUS, RadarGrid } from "./RadarGrid";
import { useMemo } from "react";
import { GENRE, YEARS } from "../../utils/constants";
import { mainColors } from "../../utils/theme";
import { useMovies } from "../../contexts/MoviesContext";

const COLORS = Object.values(mainColors);

export const Radar = ({ width, height, isRuntimeShift, margin }) => {
	const outerRadius = Math.min(width, height) / 2 - margin;
	const { runtimeShift, genreShift } = useMovies();

	const data = useMemo(
		() => (isRuntimeShift ? runtimeShift : genreShift),
		[genreShift, runtimeShift, isRuntimeShift]
	);

	const axisConfig = YEARS.map((e) => ({
		name: e,
		max: isRuntimeShift ? 150 : 50,
	}));

	// The x scale provides an angle for each variable of the dataset
	const allVariableNames = axisConfig.map((axis) => axis.name);
	const xScale = d3
		.scaleBand()
		.domain(allVariableNames)
		.range([0, 2 * Math.PI]);

	// Compute the y scales: 1 scale per variable.
	// Provides the distance to the center.
	let yScales = {};
	axisConfig.forEach((axis) => {
		yScales[axis.name] = d3
			.scaleRadial()
			.domain([0, axis.max])
			.range([INNER_RADIUS, outerRadius]);
	});

	// Color Scale
	const allGroups = data.map((d) => d.name);
	const colorScale = d3.scaleOrdinal().domain(allGroups).range(COLORS);

	// Compute the main radar shapes, 1 per group
	const lineGenerator = d3.lineRadial();

	const allLines = data.map((series, i) => {
		const allCoordinates = axisConfig.map((axis) => {
			const yScale = yScales[axis.name];
			const angle = xScale(axis.name) ?? 0; // I don't understand the type of scalePoint. IMO x cannot be undefined since I'm passing it something of type Variable.
			const radius = yScale(series[axis.name]);
			const coordinate = [angle, radius];
			return coordinate;
		});

		// To close the path of each group, the path must finish where it started
		// so add the last data point at the end of the array
		allCoordinates.push(allCoordinates[0]);

		const d = lineGenerator(allCoordinates);

		if (!d) {
			return;
		}

		return (
			<path
				key={i}
				d={d}
				stroke={colorScale(series.name)}
				strokeWidth={3}
				fill={colorScale(series.name)}
				fillOpacity={0.1}
			/>
		);
	});

	return (
		<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
			<g transform={"translate(" + width / 2 + "," + height / 2 + ")"}>
				<RadarGrid
					outerRadius={outerRadius}
					xScale={xScale}
					axisConfig={axisConfig}
				/>
				{allLines}
			</g>
		</svg>
	);
};
