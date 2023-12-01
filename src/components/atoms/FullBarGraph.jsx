import { useMemo } from "react";
import * as d3 from "d3";
import { useGraphInteractivity } from "../../contexts/InteractivityContext";
import { mainColors, themeColors } from "../../utils/theme";
import moment from "moment";
import { YEARS } from "../../utils/constants";
import clsx from "clsx";

const FullBarGraph = ({ width, height, margin, openDetailedView }) => {
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;

	const {
		allMoviesByImdbAndReleaseDate: data,
		setSelectedYear,
		selectedYear,
	} = useGraphInteractivity();

	const xScale = useMemo(() => {
		return d3
			.scaleTime()
			.domain([
				moment("01 Jan 2007", "DD MMM YYYY").toDate(),
				moment("31 Dec 2022", "DD MMM YYYY").toDate(),
			])
			.range([0, boundsWidth]);
	}, [boundsWidth]);

	// y axis
	const yScale = useMemo(() => {
		return d3.scaleLinear().domain([0, 10]).range([0, boundsHeight]);
	}, [boundsHeight]);

	const allShapes = data.map((d, i) => {
		const x = xScale(moment(d.releaseDate, "DD MMM YYYY").toDate());
		if (x === undefined) {
			return null;
		}

		return (
			<g
				onClick={() => {
					console.log(d);
					setSelectedYear(d.year);
				}}
				onDoubleClick={() => {
					openDetailedView();
				}}
				key={i}
				className='cursor-pointer'
			>
				<rect
					y={yScale(0)}
					x={xScale(moment(d.releaseDate, "DD MMM YYYY").toDate())}
					width={boundsWidth / data.length}
					height={yScale(d.imdb)}
					opacity={0.7}
					stroke={
						d.year === selectedYear
							? mainColors["orange-main"]
							: themeColors["gray-text"]
					}
					fill={
						d.year === selectedYear
							? mainColors["orange-main"]
							: themeColors["gray-text"]
					}
					fillOpacity={0.3}
					strokeWidth={1}
					rx={1}
				/>
			</g>
		);
	});

	const grid = useMemo(
		() =>
			yScale
				.ticks(10)
				.slice(1)
				.map((value, i) => (
					<g key={i}>
						<line
							y1={yScale(value)}
							y2={yScale(value)}
							x1={0}
							x2={boundsWidth}
							stroke='#808080'
							opacity={0.05}
						/>
						<text
							y={yScale(value)}
							x={boundsWidth + 10}
							textAnchor='middle'
							alignmentBaseline='central'
							fontSize={9}
							stroke='#808080'
							opacity={0.8}
						>
							{value}
						</text>
					</g>
				)),
		[boundsWidth, yScale]
	);

	const gridX = useMemo(
		() =>
			YEARS.map((value, i) => {
				return (
					<g
						key={i}
						className={clsx(+value === selectedYear && "fill-orange-main/10")}
					>
						<text
							y={-10}
							x={xScale(moment(`01 Jan ${value}`, "DD MMM YYYY").toDate())}
							textAnchor='middle'
							alignmentBaseline='central'
							fontSize={+value === selectedYear ? 14 : 9}
							stroke={
								+value === selectedYear
									? mainColors["orange-main"]
									: themeColors["gray-text"]
							}
							opacity={1}
						>
							{value}
						</text>
					</g>
				);
			}),
		[xScale, selectedYear]
	);

	return (
		<div>
			<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
				<g
					width={boundsWidth}
					height={boundsHeight}
					transform={`translate(${[margin.left, margin.top].join(",")})`}
				>
					{grid}
					{gridX}
					{allShapes}
				</g>
			</svg>
		</div>
	);
};

export default FullBarGraph;
