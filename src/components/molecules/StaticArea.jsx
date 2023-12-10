import GroupedCharts from "./GroupedCharts";
import { useMovies } from "../../contexts/MoviesContext";
import Loader from "../atoms/Loader/Loader";
import SelectorChart from "./SelectorChart";
import ZoomChartOverlay from "./ZoomChartOverlay";
import { useState } from "react";
import clsx from "clsx";
import { graphInfo } from "../../utils/graphInfo";

const StaticArea = () => {
	const { isLoading } = useMovies();
	const [showDetailedView, setShowDetailedView] = useState(false);
	return (
		<div
			className={clsx(
				"relative flex flex-col items-center justify-start w-full h-full pt-4 "
			)}
		>
			{isLoading && (
				<div className='absolute z-30 flex items-center justify-center w-full h-full bg-black/5 backdrop-blur-sm'>
					<Loader />
				</div>
			)}
			{showDetailedView && (
				<ZoomChartOverlay
					width={graphInfo.zoomOverlayChart.dimensions.width}
					height={graphInfo.zoomOverlayChart.dimensions.height}
					margin={graphInfo.zoomOverlayChart.dimensions.margin}
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
