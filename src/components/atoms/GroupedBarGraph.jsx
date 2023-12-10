import { useMemo } from "react";
import * as d3 from "d3";
import { clipText } from "../../utils/helperFuntions";
import { useMovies } from "../../contexts/MoviesContext";
import { mainColors, themeColors } from "../../utils/theme";
import { GENRE } from "../../utils/constants";
const colors = {
	comedy: mainColors["blue-main"],
	action: mainColors["green-main"],
	adventure: mainColors["yellow-main"],
	romance: mainColors["purple-main"],
	drama: mainColors["pink-main"],
};
const BAR_PADDING = 0.3;

// type BarplotProps = {
// 	width: number,
// 	height: number,
// 	data: { name: string, value: number }[],
// };

export const GroupedBarGraph = ({ width, height, margin, xAxisLabel }) => {
	// bounds = area inside the graph axis = calculated by substracting the margins
	const { byRevenueType: data } = useMovies();
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;
	const transformedKey = useMemo(
		() => Object.keys(data).filter((e) => GENRE.includes(e)),
		[data]
	);
	// Y axis is for groups since the barplot is horizontal
	const groups = transformedKey;
	const yScale = useMemo(() => {
		return d3
			.scaleBand()
			.domain(groups)
			.range([0, boundsHeight])
			.padding(BAR_PADDING);
	}, [data, height]);

	// X axis
	const xScale = useMemo(() => {
		const [min, max] = d3.extent(
			transformedKey.map((d) =>
				Math.max(data[d].domestic, data[d].international)
			)
		);
		return d3
			.scaleLinear()
			.domain([0, max || 10])
			.range([0, boundsWidth]);
	}, [data, width]);

	// Build the shapes
	const allShapes = transformedKey.map((d, i) => {
		const y = yScale(d);
		if (y === undefined) {
			return null;
		}

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
				<rect
					x={xScale(0)}
					y={yScale(d)}
					width={xScale(data[d].domestic)}
					height={yScale.bandwidth() / 2 - 2}
					opacity={0.9}
					stroke={mainColors["orange-main"]}
					fill={mainColors["orange-main"]}
					fillOpacity={0.4}
					strokeWidth={1}
					rx={1}
				>
					<title>{data[d].domestic}</title>
				</rect>
				<rect
					x={xScale(0)}
					y={yScale(d) + yScale.bandwidth() / 2 + 2}
					width={xScale(data[d].international)}
					height={yScale.bandwidth() / 2 - 2}
					opacity={0.9}
					stroke={mainColors["red-main"]}
					fill={mainColors["red-main"]}
					fillOpacity={0.4}
					strokeWidth={1}
					rx={1}
				>
					<title>{data[d].international}</title>
				</rect>

				<text
					x={-70}
					className='text-sm capitalize'
					y={y + yScale.bandwidth() / 2 + 4}
					textAnchor='start'
					alignmentBaseline='central'
					fill={colors[d]}
				>
					{clipText(d, 10)}
				</text>
			</g>
		);
	});

	const grid = xScale
		.ticks(5)
		.slice(1)
		.map((value, i) => (
			<g key={i}>
				<line
					x1={xScale(value)}
					x2={xScale(value)}
					y1={0}
					y2={boundsHeight}
					stroke='#808080'
					opacity={0.2}
				/>
				<text
					x={xScale(value)}
					y={boundsHeight + 10}
					textAnchor='middle'
					alignmentBaseline='central'
					fontSize={9}
					stroke='#808080'
					color='#ffffff'
					opacity={0.8}
				>
					{value}
				</text>
			</g>
		));

	return (
		<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
			<g
				width={boundsWidth}
				height={boundsHeight}
				transform={`translate(${[margin.left, margin.top].join(",")})`}
			>
				{grid}
				{allShapes}
			</g>
		</svg>
	);
};
