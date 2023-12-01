import React from "react";
import FullBarGraph from "../atoms/FullBarGraph";
import { useTab } from "../../contexts/TabContext";
import clsx from "clsx";
import { Heatmap } from "../atoms/HeatMap";
import { groupedChartsDimensions } from "../../utils/constants";

const SelectorChart = ({ openDetailedView }) => {
	const { changeTab, currentTab } = useTab();
	return (
		<div className='flex flex-col items-stretch justify-start gap-1 text-[10px] w-full'>
			<div className='flex flex-row items-end self-end justify-start px-8 '>
				<div
					className={clsx(
						{ "bg-orange-main/10 border-orange-main": currentTab === "bar" },
						"py-1 pl-2 pr-1 border rounded-l-sm border-gray-text cursor-pointer flex justify-center items-center"
					)}
					onClick={() => {
						changeTab("bar");
					}}
				>
					📊
				</div>
				<div
					className={clsx(
						{ "bg-pink-main/10 border-pink-main": currentTab === "heat" },
						"py-1 pl-2 flex justify-center items-center pr-2 border cursor-pointer rounded-r-[4px] border-gray-text"
					)}
					onClick={() => {
						changeTab("heat");
					}}
				>
					📉
				</div>
			</div>
			{currentTab === "bar" ? (
				<FullBarGraph
					width={groupedChartsDimensions.fullBarGraph.width}
					height={groupedChartsDimensions.fullBarGraph.height}
					margin={groupedChartsDimensions.fullBarGraph.margin}
					openDetailedView={openDetailedView}
				/>
			) : (
				<Heatmap
					width={groupedChartsDimensions.fullBarGraph.width}
					height={groupedChartsDimensions.fullBarGraph.height}
					margin={groupedChartsDimensions.fullBarGraph.margin}
				/>
			)}
		</div>
	);
};

export default SelectorChart;
