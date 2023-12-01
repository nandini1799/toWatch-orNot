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
import { themeBasedOnSelector } from "../../utils/theme";
import { groupedChartsDimensions } from "../../utils/constants";
import { Radar } from "../atoms/Radar";

const GroupedCharts = () => {
	const {
		graphInfoToggleState: {
			showGroupBarChartInfo,
			showPieChartInfo,
			showStackedBarChartInfo,
		},
		setGraphInfoToggleState,
	} = useGraphInfoToggle();
	const { currentTab } = useTab();
	const cardClass = `relative before:transition-all before:duration-300 grow px-2 py-4 flex items-center justify-center max-h-[320px] bg-gray-bg-box truncate rounded-lg`;
	const infoCardClass = `absolute backdrop-blur-[15px] top-0 right-0 left-0 bottom-0 w-full h-full bg-gray-950/90 z-10 rounded-lg text-center items-center justify-center flex font-semibold text-base text-white transition-all duration-300`;
	const showInfoButton =
		"absolute z-20 w-14 h-14 rounded-full cursor-pointer translate-y-[-40%] translate-x-[-60%] transition-all duration-300 top-0 left-full opacity-25 hover:opacity-100 hover:translate-y-[-30%] hover:translate-x-[-70%]";
	const infoColor = `bg-${themeBasedOnSelector[currentTab].tailwindValue}`;

	return (
		<div className='relative flex flex-col w-full h-full gap-8 p-4'>
			<div className='flex flex-col flex-wrap justify-center w-full gap-4 text-white '>
				<div className='flex flex-row w-full gap-4'>
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
							className={clsx(
								!showPieChartInfo ? infoColor : "bg-white",
								showInfoButton
							)}
						/>
						<PieChart
							width={groupedChartsDimensions.pieChart.width}
							height={groupedChartsDimensions.pieChart.height}
							margin={groupedChartsDimensions.pieChart.margin}
						/>
						{showPieChartInfo && (
							<div className={clsx(infoCardClass)}>
								<p>{graphInfo.pieChart.heading}</p>
							</div>
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
							className={clsx(
								!showStackedBarChartInfo ? infoColor : "bg-white",
								showInfoButton
							)}
						/>
						<StackedBarGraph
							width={groupedChartsDimensions.stackedBarChart.width}
							height={groupedChartsDimensions.stackedBarChart.height}
							yAxisLabel={"Earnings in Millions ($)"}
							xAxisLabel={"Rotten Tomato's Rating (%)"}
							margin={groupedChartsDimensions.stackedBarChart.margin}
						/>
						{showStackedBarChartInfo && (
							<div className={clsx(infoCardClass)}>
								<p>{graphInfo.stackedBarChart.heading}</p>
							</div>
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
							className={clsx(
								!showGroupBarChartInfo ? infoColor : "bg-white",
								showInfoButton
							)}
						/>
						<GroupedBarGraph
							width={groupedChartsDimensions.groupBarChart.width}
							height={groupedChartsDimensions.groupBarChart.height}
							xAxisLabel={"Earnings in Millions ($)"}
							margin={groupedChartsDimensions.groupBarChart.margin}
						/>
						{showGroupBarChartInfo && (
							<div className={clsx(infoCardClass)}>
								<p>{graphInfo.groupBarChart.heading}</p>
							</div>
						)}
					</div>
				</div>
				<div className='relative flex flex-row w-full gap-4 border-[2px] border-gray-text/10 bg-gray-bg-boxfull/30 gray-bg rounded-2xl'>
					<div className='py-2 grow'>
						<div className='w-[35%] py-2'>
							<Radar
								width={groupedChartsDimensions.spider1.width}
								height={groupedChartsDimensions.spider1.height}
								margin={groupedChartsDimensions.spider1.margin}
							/>
						</div>
					</div>
					<div className='absolute left-[50%] opacity-10 top-[50%] translate-y-[-50%] translate-x-[-50%] h-[70%] w-[2px] rounded-[50%]  bg-gray-text'></div>
					<div className='py-2 grow'>
						<div className='w-[35%] py-2'>
							<Radar
								isRuntimeShift
								width={groupedChartsDimensions.spider2.width}
								height={groupedChartsDimensions.spider2.height}
								margin={groupedChartsDimensions.spider2.margin}
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default GroupedCharts;
