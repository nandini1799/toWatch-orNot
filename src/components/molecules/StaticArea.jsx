import GroupedCharts from "./GroupedCharts";
import { useMovies } from "../../contexts/MoviesContext";
import Loader from "../atoms/Loader/Loader";
import SelectorChart from "./SelectorChart";
import ZoomChartOverlay from "./ZoomChartOverlay";
import { useState } from "react";

const StaticArea = () => {
	const { isLoading } = useMovies();
	const [showDetailedView, setShowDetailedView] = useState(false);
	return (
		<div className='relative flex flex-col items-center justify-start w-full h-full pt-4'>
			{isLoading && (
				<div className='absolute z-30 flex items-center justify-center w-full h-full bg-black/5 backdrop-blur-sm'>
					<Loader />
				</div>
			)}
			{showDetailedView && (
				<ZoomChartOverlay
					width={1500}
					height={700}
					margin={{ top: 30, left: 30, right: 30, bottom: 30 }}
					closeDetailedView={() => {
						setShowDetailedView(false);
					}}
				/>
			)}
			<SelectorChart
				openDetailedView={() => {
					setShowDetailedView(true);
				}}
			/>
			<GroupedCharts />
		</div>
	);
};

export default StaticArea;
