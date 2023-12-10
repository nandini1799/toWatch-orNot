import clsx from "clsx";
import { graphInfo } from "../../utils/graphInfo";
import { GroupedBarGraph } from "../atoms/GroupedBarGraph";
import { PieChart } from "../atoms/PieChart";
import { StackedBarGraph } from "../atoms/StackedBarGraph";
import {
	toggleInfoStateKeys,
	useGraphInfoToggle,
} from "../../contexts/GraphInfoContext";
import { useTab } from "../../contexts/TabContext";
import { themeBasedOnSelector, themeColors } from "../../utils/theme";
import Legends from "../atoms/Legends";
import InfoOverlay from "../atoms/InfoOverlay";
import GroupedLineGraph from "../atoms/GroupedLineGraph";

const GroupedCharts = () => {
	const {
		graphInfoToggleState: {
			showGroupBarChartInfo,
			showPieChartInfo,
			showStackedBarChartInfo,
			showRuntimeShiftChartInfo,
			showGenreShiftChartInfo,
		},
		setGraphInfoToggleState,
	} = useGraphInfoToggle();
	const { currentTab } = useTab();
	const cardClass = `relative before:transition-all before:duration-300 grow px-2 py-4 flex items-center justify-center max-h-[320px] bg-gray-bg-box truncate rounded-lg`;
	const showInfoButton =
		"absolute z-20 w-14 h-14 rounded-full cursor-pointer translate-y-[-40%] translate-x-[-60%] transition-all duration-300 top-0 left-full opacity-25 hover:opacity-100 hover:translate-y-[-30%] hover:translate-x-[-70%]";

	return (
		<div className='relative flex flex-col w-full h-full gap-8 p-4 pt-0'>
			<div className='flex flex-col flex-wrap justify-center w-full gap-4 text-white '>
				<div className='flex flex-row w-full gap-4 '>
					<div className={clsx(cardClass)}>
						<div
							onMouseEnter={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showPieChartInfo,
									true
								);
							}}
							onMouseLeave={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showPieChartInfo,
									false
								);
							}}
							className={clsx(showInfoButton)}
							style={{
								backgroundColor: !showPieChartInfo
									? themeBasedOnSelector[currentTab].mainColor
									: themeColors.white,
							}}
						/>
						<PieChart
							width={graphInfo.pieChart.dimensions.width}
							height={graphInfo.pieChart.dimensions.height}
							margin={graphInfo.pieChart.dimensions.margin}
						/>
						{showPieChartInfo && (
							<InfoOverlay
								heading={graphInfo.pieChart.heading}
								content={graphInfo.pieChart.content}
							/>
						)}
					</div>
					<div className={clsx(cardClass)}>
						<div
							onMouseEnter={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showStackedBarChartInfo,
									true
								);
							}}
							onMouseLeave={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showStackedBarChartInfo,
									false
								);
							}}
							className={clsx(showInfoButton)}
							style={{
								backgroundColor: !showStackedBarChartInfo
									? themeBasedOnSelector[currentTab].mainColor
									: themeColors.white,
							}}
						/>
						<Legends
							classes={"absolute flex gap-6 top-[10px] font-light text-sm"}
							legends={graphInfo.stackedBarChart.legend}
						/>
						<StackedBarGraph
							width={graphInfo.stackedBarChart.dimensions.width}
							height={graphInfo.stackedBarChart.dimensions.height}
							yAxisLabel={graphInfo.stackedBarChart.labels.y}
							xAxisLabel={graphInfo.stackedBarChart.labels.x}
							margin={graphInfo.stackedBarChart.dimensions.margin}
						/>
						{showStackedBarChartInfo && (
							<InfoOverlay
								heading={graphInfo.stackedBarChart.heading}
								content={graphInfo.stackedBarChart.content}
							/>
						)}
					</div>
					<div className={clsx(cardClass)}>
						<div
							onMouseEnter={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showGroupBarChartInfo,
									true
								);
							}}
							onMouseLeave={() => {
								setGraphInfoToggleState(
									toggleInfoStateKeys.showGroupBarChartInfo,
									false
								);
							}}
							className={clsx(showInfoButton)}
							style={{
								backgroundColor: !showGroupBarChartInfo
									? themeBasedOnSelector[currentTab].mainColor
									: themeColors.white,
							}}
						/>
						<Legends
							classes={"absolute flex gap-6 top-[10px] font-light text-sm"}
							legends={graphInfo.groupBarChart.legend}
						/>
						<GroupedBarGraph
							width={graphInfo.groupBarChart.dimensions.width}
							height={graphInfo.groupBarChart.dimensions.height}
							xAxisLabel={graphInfo.groupBarChart.labels.x}
							margin={graphInfo.groupBarChart.dimensions.margin}
						/>
						{showGroupBarChartInfo && (
							<InfoOverlay
								heading={graphInfo.groupBarChart.heading}
								content={graphInfo.groupBarChart.content}
							/>
						)}
					</div>
				</div>
				<div className='relative truncate flex flex-row w-full gap-4 border-[2px] border-gray-text/10 bg-gray-bg-boxfull/30 gray-bg rounded-2xl'>
					<div
						onMouseEnter={() => {
							setGraphInfoToggleState(
								toggleInfoStateKeys.showGenreShiftChartInfo,
								true
							);
						}}
						onMouseLeave={() => {
							setGraphInfoToggleState(
								toggleInfoStateKeys.showGenreShiftChartInfo,
								false
							);
						}}
						className={clsx(
							`absolute z-20 w-14 h-14 rounded-full cursor-pointer translate-y-[-40%] translate-x-[60%] transition-all duration-300 top-0 right-full opacity-25 hover:opacity-100 hover:translate-y-[-30%] hover:translate-x-[70%]`
						)}
						style={{
							backgroundColor: !showGenreShiftChartInfo
								? themeBasedOnSelector[currentTab].mainColor
								: themeColors.white,
						}}
					/>
					<div
						onMouseEnter={() => {
							setGraphInfoToggleState(
								toggleInfoStateKeys.showRuntimeShiftChartInfo,
								true
							);
						}}
						onMouseLeave={() => {
							setGraphInfoToggleState(
								toggleInfoStateKeys.showRuntimeShiftChartInfo,
								false
							);
						}}
						className={clsx(showInfoButton)}
						style={{
							backgroundColor: !showRuntimeShiftChartInfo
								? themeBasedOnSelector[currentTab].mainColor
								: themeColors.white,
						}}
					/>
					{showGenreShiftChartInfo && (
						<InfoOverlay
							isPartial
							heading={graphInfo.genreShiftChart.heading}
							content={graphInfo.genreShiftChart.content}
						/>
					)}
					{showRuntimeShiftChartInfo && (
						<InfoOverlay
							isPartial
							onRight
							heading={graphInfo.runtimeShiftChart.heading}
							content={graphInfo.runtimeShiftChart.content}
						/>
					)}

					<div className='pt-4 grow'>
						<GroupedLineGraph
							width={graphInfo.genreShiftChart.dimensions.width}
							height={graphInfo.genreShiftChart.dimensions.height}
							margin={graphInfo.genreShiftChart.dimensions.margin}
							yAxisLabel={graphInfo.genreShiftChart.labels.y}
						/>
					</div>
					<div className='absolute left-[50%] opacity-10 top-[50%] translate-y-[-50%] translate-x-[-50%] h-[70%] w-[2px] rounded-[50%]  bg-gray-text'></div>
					<Legends
						isController
						classes={
							"absolute w-full justify-center flex gap-6 top-[10px] font-light text-sm"
						}
						legends={graphInfo.runtimeShiftChart.legend}
					/>
					<div className='pt-4 grow'>
						<GroupedLineGraph
							width={graphInfo.runtimeShiftChart.dimensions.width}
							height={graphInfo.runtimeShiftChart.dimensions.height}
							margin={graphInfo.runtimeShiftChart.dimensions.margin}
							yAxisLabel={graphInfo.runtimeShiftChart.labels.y}
							isRuntimeShift
						/>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupedCharts;
