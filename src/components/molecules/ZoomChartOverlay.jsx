import React, { useMemo, useState } from "react";
import * as d3 from "d3";
import { useMovies } from "../../contexts/MoviesContext";
import { useGraphInteractivity } from "../../contexts/InteractivityContext";
import moment from "moment";
import { transformMoviesForYearWiseChart } from "../../utils/d3-transformer";
import {
	mainColors,
	themeBasedOnSelector,
	themeColors,
} from "../../utils/theme";
import clsx from "clsx";
import { MONTHS } from "../../utils/constants";
import MovieCard from "../atoms/MovieCard";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import { useTab } from "../../contexts/TabContext";

const ZoomChartOverlay = ({ margin, width, height, closeDetailedView }) => {
	const boundsWidth = width - margin.right - margin.left;
	const boundsHeight = height - margin.top - margin.bottom;
	const { currentTab } = useTab();

	const { movies } = useMovies();
	const { selectedYear, setSelectedYear } = useGraphInteractivity();
	const data = useMemo(() => transformMoviesForYearWiseChart(movies), [movies]);
	const [selectedMovieReleaseDate, setSelectedMovieReleaseDate] = useState("");
	const xScale = useMemo(() => {
		return d3
			.scaleTime()
			.domain([
				moment(`01 Jan ${selectedYear}`, "DD MMM YYYY").toDate(),
				moment(`31 Dec ${selectedYear}`, "DD MMM YYYY").toDate(),
			])
			.range([0, boundsWidth]);
	}, [boundsWidth, selectedYear]);

	const nextYearMovies = () => {
		if (selectedYear >= 2022) {
			return;
		}

		setSelectedMovieReleaseDate("");
		setSelectedYear((prev) => prev + 1);
	};

	const prevYearMovies = () => {
		if (selectedYear <= 2007) {
			return;
		}
		setSelectedMovieReleaseDate("");
		setSelectedYear((prev) => prev - 1);
	};

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
				key={i}
				onClick={() => {
					setSelectedMovieReleaseDate(d.releaseDate);
				}}
				className='cursor-pointer'
			>
				<rect
					y={yScale(0)}
					x={xScale(moment(d.releaseDate, "DD MMM YYYY").toDate())}
					width={boundsWidth / 156}
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
			MONTHS.map((value, i) => {
				return (
					<g
						key={i}
						className={clsx(+value === selectedYear && "fill-orange-main/10")}
					>
						<text
							y={-20}
							x={xScale(
								moment(`01 ${value} ${selectedYear}`, "DD MMM YYYY").toDate()
							)}
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
		<>
			<div
				className='fixed top-0 left-0 z-50 w-screen h-screen backdrop-blur-sm'
				onClick={closeDetailedView}
			/>
			<div className='fixed top-[50%] left-[50%] z-50 w-[85vw] h-[85vh] translate-x-[-50%] translate-y-[-50%] bg-black/80 backdrop-blur-xl rounded-2xl border-[1px] shadow-[0_0_10px_1px_rgba(255,255,255,0.03)] border-white/10 flex flex-col text-white justify-start items-stretch py-10 px-7 gap-8'>
				<div className='relative flex items-center justify-center text-3xl font-bold text-center font-bebas'>
					{selectedYear > 2007 ? (
						<FaAngleLeft
							color={themeColors.white}
							size={28}
							className='cursor-pointer box-content p-2 transition-all duration-300 rounded-full hover:bg-white/10 active:bg-white/30 absolute top-[50%] translate-y-[-50%] left-0'
							onClick={prevYearMovies}
						/>
					) : (
						<></>
					)}
					{selectedYear} Movie&apos;s Release Date vs IMDB
					{selectedYear < 2022 ? (
						<FaAngleRight
							color={themeColors.white}
							size={28}
							className='cursor-pointer box-content p-2 transition-all duration-300 rounded-full active:bg-white/30 hover:bg-white/10 absolute top-[50%] translate-y-[-50%] right-0'
							onClick={nextYearMovies}
						/>
					) : (
						<></>
					)}
				</div>
				<svg
					className='self-center w-full h-full'
					viewBox={`0 0 ${width} ${height}`}
				>
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
			{movies &&
				Array.isArray(movies) &&
				!!movies.length &&
				!!selectedMovieReleaseDate && (
					<MovieCard
						releaseDate={selectedMovieReleaseDate}
						clearReleaseDate={() => {
							setSelectedMovieReleaseDate("");
						}}
					/>
				)}
		</>
	);
};

export default ZoomChartOverlay;
