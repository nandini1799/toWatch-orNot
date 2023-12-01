import { useEffect, useRef } from "react";
import * as d3 from "d3";
import { useMovies } from "../../contexts/MoviesContext";
import { mainColors, themeColors } from "../../utils/theme";

export const ConnectedScatterGraph = ({
	width,
	height,
	margin,
	xAxisLabel,
	yAxisLabel,
}) => {
	// bounds = area inside the graph axis = calculated by substracting the margins
	const { byAudienceType: data } = useMovies();
	const axesRef = useRef(null);
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;

	// Y axis
	const [min, max] = d3.extent(data, (d) => d.y);
	const yScale = d3
		.scaleLinear()
		.domain([0, max || 0])
		.range([boundsHeight, 0]);

	// X axis
	const [xMin, xMax] = d3.extent(data, (d) => d.x);
	const xScale = d3
		.scaleLinear()
		.domain([xMin - 5, xMax + 5 || 0])
		.range([0, boundsWidth]);

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

	// Build the line
	const lineBuilder = d3
		.line()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));
	const linePath = lineBuilder(data);
	if (!linePath) {
		return null;
	}

	// Build the circles
	const allCircles = data.map((item, i) => {
		return (
			<circle
				key={i}
				cx={xScale(item.x)}
				cy={yScale(item.y)}
				r={4}
				fill={mainColors["pink-main"]}
			/>
		);
	});

	return (
		<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
			<g
				width={boundsWidth}
				height={boundsHeight}
				transform={`translate(${[margin.left, margin.top].join(",")})`}
			>
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
					x={-boundsHeight / 2}
					y={-40}
					transform='rotate(-90)'
					dominantBaseline='middle'
				>
					{yAxisLabel}
				</text>
				<path
					d={linePath}
					opacity={0.3}
					stroke={mainColors["pink-main"]}
					fill='none'
					strokeWidth={2}
				/>
				{allCircles}
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
