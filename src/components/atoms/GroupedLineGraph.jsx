import { useEffect, useMemo, useRef } from "react";
import * as d3 from "d3";
import { nest } from "d3-collection";
import { useMovies } from "../../contexts/MoviesContext";
import { mainColors, themeColors } from "../../utils/theme";
import { GENRE } from "../../utils/constants";
import { useTab } from "../../contexts/TabContext";
import Cursor from "./Cursor";

const GroupedLineGraph = ({
	width,
	height,
	margin,
	isRuntimeShift,
	yAxisLabel,
}) => {
	// bounds = area inside the graph axis = calculated by substracting the margins
	const { genreShift, runtimeShift } = useMovies();
	const { selectedLegend, sharedCursor, setSharedCursorPosition } = useTab();
	const data = isRuntimeShift ? runtimeShift : genreShift;
	const dataSet = useMemo(
		() =>
			nest()
				.key((d) => d.g)
				.entries(data),
		[data]
	);
	const axesRef = useRef(null);
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;

	// Y axis
	const [min, max] = useMemo(() => d3.extent(data, (d) => d.y), [data]);
	const yScale = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([isRuntimeShift ? 90 : min, max || 0])
			.range([boundsHeight, 0]);
	}, [boundsHeight, min, max, isRuntimeShift]);

	// X axis
	const [xMin, xMax] = useMemo(() => d3.extent(data, (d) => d.x), [data]);
	const xScale = useMemo(() => {
		return d3
			.scaleLinear()
			.domain([xMin, xMax || 0])
			.range([0, boundsWidth]);
	}, [boundsWidth, xMax, xMin]);

	const colorBands = useMemo(
		() =>
			d3
				.scaleOrdinal()
				.domain(dataSet.map((e) => e.key))
				.range([
					mainColors["blue-main"],
					mainColors["green-main"],
					mainColors["yellow-main"],
					mainColors["pink-main"],
					mainColors["purple-main"],
				]),
		[dataSet]
	);

	console.log(isRuntimeShift ? data : "nope");

	// Render the X and Y axis using d3.js, not react
	useEffect(() => {
		const svgElement = d3.select(axesRef.current);
		svgElement.selectAll("*").remove();
		const xAxisGenerator = d3.axisBottom(xScale).ticks(12);
		svgElement
			.append("g")
			.attr("transform", "translate(0," + boundsHeight + ")")
			.call(xAxisGenerator);

		const yAxisGenerator = d3.axisLeft(yScale);
		svgElement.append("g").call(yAxisGenerator);
	}, [xScale, yScale, boundsHeight]);
	console.log("dataset", dataSet);
	// Build the line
	const lineBuilder = d3
		.line()
		.x((d) => xScale(d.x))
		.y((d) => yScale(d.y));
	const linePaths = dataSet.map((genere) => lineBuilder(genere.values));
	if (!linePaths) {
		return null;
	}

	const getClosestPoint = (cursorPixelPosition) => {
		const x = xScale.invert(cursorPixelPosition);

		let minDistance = Infinity;
		let closest = null;

		for (const point of data) {
			const distance = Math.abs(point.x - x);
			if (distance < minDistance) {
				minDistance = distance;
				closest = point;
			}
		}

		return closest;
	};

	const onMouseMove = (e) => {
		const rect = e.currentTarget.getBoundingClientRect();
		const mouseX = e.clientX - rect.left;

		const closest = getClosestPoint(mouseX);

		setSharedCursorPosition(xScale(closest.x));
	};

	return (
		<div>
			<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
				<g
					width={boundsWidth}
					height={boundsHeight}
					transform={`translate(${[margin.left, margin.top].join(",")})`}
				>
					<text
						fill={themeColors["gray-text"]}
						className='text-xs font-semibold'
						x={-boundsHeight}
						y={-35}
						transform='rotate(-90)'
						dominantBaseline='middle'
					>
						{yAxisLabel}
					</text>
					{linePaths.map((e, i) => (
						<>
							<path
								key={i}
								d={e}
								opacity={
									!selectedLegend
										? 1
										: colorBands(GENRE[i]) === selectedLegend
										? 1
										: 0.5
								}
								stroke={
									!selectedLegend
										? colorBands(GENRE[i])
										: colorBands(GENRE[i]) === selectedLegend
										? colorBands(GENRE[i])
										: themeColors["gray-text"]
								}
								fill='none'
								strokeWidth={
									!selectedLegend
										? 2
										: colorBands(GENRE[i]) === selectedLegend
										? 3
										: 1
								}
							/>
						</>
					))}
					{sharedCursor && (
						<Cursor
							height={boundsHeight}
							x={sharedCursor}
							y={yScale(getClosestPoint(sharedCursor)?.y)}
							color={selectedLegend ? selectedLegend : themeColors["gray-text"]}
						/>
					)}
					<rect
						className='cursor-pointer'
						x={0}
						y={0}
						width={boundsWidth}
						height={boundsHeight}
						onMouseMove={onMouseMove}
						onMouseLeave={() => setSharedCursorPosition(null)}
						visibility={"hidden"}
						pointerEvents={"all"}
					/>
				</g>
				<g
					width={boundsWidth}
					height={boundsHeight}
					ref={axesRef}
					transform={`translate(${[margin.left, margin.top].join(",")})`}
				/>
			</svg>
		</div>
	);
};

export default GroupedLineGraph;
