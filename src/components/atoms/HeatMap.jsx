import { useMemo } from "react";
import * as d3 from "d3";
import { mainColors, themeColors } from "../../utils/theme";
import { useMovies } from "../../contexts/MoviesContext";
import { useGraphInteractivity } from "../../contexts/InteractivityContext";

export const Heatmap = ({ width, height, margin }) => {
	const { imdbHeatMap: data } = useMovies();
	const { selectedYear, setSelectedYear } = useGraphInteractivity();
	// bounds = area inside the axis
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;

	const allYGroups = useMemo(() => [...new Set(data.map((d) => d.y))], [data]);
	const allXGroups = useMemo(() => [...new Set(data.map((d) => d.x))], [data]);

	// x and y scales
	const xScale = useMemo(() => {
		return d3.scaleBand().range([0, boundsWidth]).domain(allXGroups);
	}, [data, width]);

	const yScale = useMemo(() => {
		return d3.scaleBand().range([boundsHeight, 0]).domain(allYGroups);
	}, [data, height]);

	const [min, max] = d3.extent(data.map((d) => d.value));
	// Color scale
	const colorScale = d3
		.scaleLinear()
		.range([themeColors.transparent, mainColors["pink-main"]])
		.domain([min, max]);

	// Build the rectangles
	const allRects = data.map((d, i) => {
		return (
			<rect
				onClick={() => {
					setSelectedYear(+d.x);
				}}
				className='cursor-pointer'
				key={i}
				r={4}
				x={xScale(d.x)}
				y={yScale(d.y)}
				width={xScale.bandwidth()}
				height={yScale.bandwidth()}
				opacity={1}
				fill={colorScale(d.value)}
			/>
		);
	});

	const xLabels = useMemo(
		() =>
			allXGroups.map((name, i) => {
				const xPos = xScale(name) ?? 0;
				return (
					<text
						key={i}
						x={xPos + xScale.bandwidth() / 2}
						y={-12}
						textAnchor='middle'
						dominantBaseline='middle'
						fontSize={+name === selectedYear ? 14 : 9}
						fontWeight={"bold"}
						fill={
							+name === selectedYear
								? mainColors["pink-main"]
								: themeColors["gray-text"]
						}
						opacity={1}
					>
						{name}
					</text>
				);
			}),
		[selectedYear, allXGroups, xScale]
	);

	const yLabels = useMemo(
		() =>
			allYGroups.map((name, i) => {
				const yPos = yScale(name) ?? 0;
				return (
					<text
						key={i}
						x={-5}
						y={yPos + yScale.bandwidth() / 2}
						textAnchor='end'
						dominantBaseline='middle'
						fill={themeColors["gray-text"]}
						fontSize={10}
					>
						{name}
					</text>
				);
			}),
		[allYGroups, yScale]
	);

	return (
		<div>
			<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
				<g
					width={boundsWidth}
					height={boundsHeight}
					transform={`translate(${[margin.left, margin.top].join(",")})`}
				>
					{allRects}
					{xLabels}
					{yLabels}
				</g>
			</svg>
		</div>
	);
};
