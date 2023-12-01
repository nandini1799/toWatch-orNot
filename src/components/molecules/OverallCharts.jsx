import { useEffect, useState } from "react";
import data from "../../utils/overallMovies.json";
import { getAPI } from "../../utils/axiosHelper";
import { Heatmap } from "../atoms/HeatMap";
import { Radar } from "../atoms/Radar";
import {
	transformImdbHeatMapData,
	transformShiftDataChange,
} from "../../utils/d3-transformer";
import clsx from "clsx";
import { graphInfo } from "../../utils/graphInfo";
import {
	toggleInfoStateKeys,
	useGraphInfoToggle,
} from "../../contexts/GraphInfoContext";

const OverallCharts = () => {
	const [genreShift, setGenreShift] = useState([]);
	const [runtimeShift, setRuntimeShift] = useState([]);
	const [imdbHeatMap, setImdbHeatMap] = useState([]);

	const {
		graphInfoToggleState: {
			showHeatMapChartInfo,
			showSpiderWebChart1Info,
			showSpiderWebChart2Info,
		},
		setGraphInfoToggleState,
	} = useGraphInfoToggle();

	useEffect(() => {
		(async () => {
			try {
				// const { isError, data } = await getAPI(`/movies/`);
				// if (isError) throw new Error("getting grouped Api failed.");
				// if (data) {
				// 	setImdbHeatMap(() => transformImdbHeatMapData(data.heatMapIMDB));
				// 	setGenreShift(() => transformShiftDataChange(data.genreShift));
				// 	setRuntimeShift(() =>
				// 		transformShiftDataChange(data.runtimeShift, true)
				// 	);
				// }
				setImdbHeatMap(() => transformImdbHeatMapData(data.heatMapIMDB));
				setGenreShift(() => transformShiftDataChange(data.genreShift));
				setRuntimeShift(() =>
					transformShiftDataChange(data.runtimeShift, true)
				);
			} catch (err) {
				throw new Error(err);
			}
		})();
	}, []);

	const cardClass = `relative before:transition-all before:duration-300 grow max-w-[49%] flex items-center justify-center h-[400px] bg-gray-bg-box truncate rounded-lg`;
	const infoCardClass = `absolute backdrop-blur-[15px] top-0 right-0 left-0 bottom-0 w-full h-full bg-gray-950/90 z-10 rounded-lg text-center items-center justify-center flex font-semibold text-base text-white transition-all duration-300`;
	const showInfoButton =
		"absolute z-20 w-14 h-14 rounded-full cursor-pointer translate-y-[-40%] translate-x-[-60%] transition-all duration-300 top-0 left-full opacity-25 hover:opacity-100 hover:translate-y-[-30%] hover:translate-x-[-70%]";

	return (
		<div className='flex flex-col w-full h-full py-[30px] px-[100px]'>
			<div className='box-border flex flex-col flex-wrap items-stretch justify-start w-full gap-5 text-white'>
				<div className='flex flex-row w-full gap-5 '>
					<div className={clsx(cardClass, "grow max-w-full")}>
						<div
							onMouseEnter={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showHeatMapChartInfo,
									true
								);
							}}
							onMouseLeave={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showHeatMapChartInfo,
									false
								);
							}}
							className={clsx(
								!showHeatMapChartInfo ? "bg-orange-main" : "bg-white",
								showInfoButton
							)}
						/>
						<Heatmap
							data={imdbHeatMap}
							width={1150}
							height={350}
							margin={{ top: 10, right: 10, bottom: 30, left: 30 }}
						/>
						{showHeatMapChartInfo && (
							<div className={clsx(infoCardClass)}>
								<p>{graphInfo.heatMap.heading}</p>
							</div>
						)}
					</div>
				</div>
				<div className='flex flex-row w-full gap-5 '></div>
			</div>
		</div>
	);
};

export default OverallCharts;
