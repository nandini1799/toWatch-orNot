import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { useMovies } from "../../contexts/MoviesContext";
import { mainColors, themeColors } from "../../utils/theme";

// const MARGIN = { top: 30, right: 30, bottom: 50, left: 50 };

// type Group = {
//   x: string;
// } & { [key: string]: number };

// type StackedBarplotProps = {
//   width: number;
//   height: number;
//   data: Group[];
// };
const colors = {
	openingWeekend: mainColors["blue-main"],
	worldwideGross: mainColors["orange-main"],
};

export const StackedBarGraph = ({
	width,
	height,
	margin,
	xAxisLabel,
	yAxisLabel,
}) => {
	// bounds = area inside the graph axis = calculated by substracting the margins
	const { top10WorldWideGross: data } = useMovies();
	const axesRef = useRef(null);
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;

	const allGroups = data.map((d) => String(d["RTRating"]));
	const allSubgroups = useMemo(() => ["openingWeekend", "worldwideGross"], []); // todo

	// Data Wrangling: stack the data
	const stackSeries = d3.stack().keys(allSubgroups).order(d3.stackOrderNone);
	//.offset(d3.stackOffsetNone);
	const series = stackSeries(data);

	// Y axis
	const max = useMemo(
		() =>
			data.reduce((acc, curr) => Math.max(curr["worldwideGross"], acc), 0) + 20,
		[data]
	); // todo
	const yScale = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([0, max || 0])
			.range([boundsHeight, 0]);
	}, [data, height]);

	// X axis
	const xScale = useMemo(() => {
		return d3
			.scaleBand()
			.domain(allGroups)
			.range([0, boundsWidth])
			.padding(0.25);
	}, [data, width]);

	// Render the X and Y axis using d3.js, not react
	useEffect(() => {
		const svgElement = d3.select(axesRef.current);
		svgElement.selectAll("*").remove();
		const xAxisGenerator = d3.axisBottom(xScale);
		svgElement
			.append("g")
			.attr("transform", "translate(0," + boundsHeight + ")")
			.call(xAxisGenerator);

		const yAxisGenerator = d3.axisLeft(yScale);
		svgElement.append("g").call(yAxisGenerator);
	}, [xScale, yScale, boundsHeight]);

	const rectangles = series.map((subgroup, i) => {
		return (
			<g key={i}>
				<text
					fill={themeColors["gray-text"]}
					className='font-semibold'
					x={boundsWidth / 2.5}
					transform={`translate(-50%)`}
					y={boundsHeight + 40}
					dominantBaseline='middle'
				>
					{xAxisLabel}
				</text>
				<text
					fill={themeColors["gray-text"]}
					className='font-semibold'
					x={-boundsHeight / 1.5}
					y={-50}
					transform='rotate(-90)'
					dominantBaseline='middle'
				>
					{yAxisLabel}
				</text>
				{subgroup.map((group, j) => {
					return (
						<rect
							key={j}
							x={xScale(group.data["RTRating"])}
							y={yScale(group[1] - group[0])}
							height={yScale(group[0]) - yScale(group[1] - group[0])}
							width={xScale.bandwidth()}
							fill={colors[subgroup.key]}
							opacity={1}
						></rect>
					);
				})}
			</g>
		);
	});

	return (
		<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
			<g
				width={boundsWidth}
				height={boundsHeight}
				transform={`translate(${[margin.left, margin.top].join(",")})`}
			>
				{rectangles}
			</g>
			<g
				width={boundsWidth}
				height={boundsHeight}
				ref={axesRef}
				transform={`translate(${[margin.left, margin.top].join(",")})`}
			/>
		</svg>
	);
};
