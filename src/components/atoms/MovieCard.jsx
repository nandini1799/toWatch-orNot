import React, { useState } from "react";
import { useMovies } from "../../contexts/MoviesContext";
import { transformMoviesForYearWiseChart } from "../../utils/d3-transformer";
import clsx from "clsx";

const MovieCard = ({ releaseDate, clearReleaseDate }) => {
	const { movies } = useMovies();
	const [currentIndex, setCurrentIndex] = useState(0);
	const [onCard, setOnCard] = useState(false);
	const moviesForTheDate = React.useMemo(
		() =>
			movies && Array.isArray(movies) && !!movies.length
				? transformMoviesForYearWiseChart(
						movies.filter((e) => e.releaseDate === releaseDate)
				  )
				: [],
		[releaseDate, movies]
	);

	const nextMovie = () => {
		if (currentIndex >= moviesForTheDate.length - 1) {
			return;
		}
		setCurrentIndex((prev) => prev + 1);
	};
	const prevMovie = () => {
		if (currentIndex <= 0) {
			return;
		}
		setCurrentIndex((prev) => prev - 1);
	};

	return !!moviesForTheDate.length ? (
		<div
			className='fixed left-[20px] bottom-[20px] w-[265px] h-[350px] bg-black z-[100] text-white bg-black/10 backdrop-blur-xl rounded-lg border-[1px] shadow-[0_0_10px_1px_rgba(255,255,255,0.03)] border-white/10 flex flex-col justify-between'
			onMouseEnter={() => {
				setOnCard(true);
			}}
			onMouseLeave={() => {
				setOnCard(false);
			}}
		>
			<div className='relative flex items-center justify-between px-3 py-4 rounded-t-lg bg-gradient-to-b from-black to-transparent'>
				<p className='w-[10%] cursor-pointer' onClick={prevMovie}>
					{currentIndex > 0 ? "⬅️" : ""}
				</p>
				<p className='text-sm text-center grow'>
					{releaseDate} {"  "}{" "}
					{`(${currentIndex + 1}/${moviesForTheDate.length})`}
				</p>
				<p className='w-[10%] cursor-pointer' onClick={nextMovie}>
					{currentIndex < moviesForTheDate.length - 1 ? "➡️" : ""}
				</p>
			</div>
			<div className='flex flex-col gap-5 px-3 py-4 rounded-b-lg bg-gradient-to-b from-black/5 via-black/80 to-black'>
				<p className='text-xl font-bold text-center'>
					{moviesForTheDate[currentIndex].name}
				</p>
				<div className='flex justify-between text-sm'>
					<p className='font-semibold'>
						<span className='text-xs font-normal'>Director:</span>{" "}
						{moviesForTheDate[currentIndex].director}
					</p>
					<p className='font-semibold'>
						<span className='text-xs font-normal'>imdb:</span>{" "}
						{moviesForTheDate[currentIndex].imdb}
					</p>
				</div>
				<div className='flex items-center justify-between text-sm'>
					<p className='font-semibold'>
						<span className='text-xs font-normal'>Genres:</span>{" "}
						{moviesForTheDate[currentIndex].genres}
					</p>
					{!!moviesForTheDate[currentIndex].availableHere && (
						<a
							href={moviesForTheDate[currentIndex].availableHere}
							target='_blank'
							rel='noreferrer'
							className='px-2 min-w-[55px] py-1 self-center font-semibold text-black rounded bg-orange-main'
						>
							Get It
						</a>
					)}
				</div>
			</div>
			<div className='absolute top-0 left-0 w-full h-full overflow-hidden rounded-lg -z-10'>
				<img
					src={moviesForTheDate[currentIndex].poster}
					className='w-full h-full -z-10'
				/>
			</div>
			<div
				className={clsx(
					onCard
						? "translate-y-[-80%] bg-red-main"
						: "translate-y-[-20%] bg-gray-text",
					"absolute cursor-pointer z-[-50] top-[0%] left-[0%] w-[40px] h-[40px] transition-all duration-300 translate-x-[30%]  flex justify-center items-center  rounded-full"
				)}
				onClick={() => {
					clearReleaseDate();
				}}
			>
				✖️
			</div>
		</div>
	) : (
		<></>
	);
};

export default React.memo(MovieCard);
