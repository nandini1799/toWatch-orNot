import React from "react";
import FullBarGraph from "../atoms/FullBarGraph";
import { useTab } from "../../contexts/TabContext";
import clsx from "clsx";
import { Heatmap } from "../atoms/HeatMap";
import { graphInfo } from "../../utils/graphInfo";
import { MdBarChart } from "react-icons/md";
import { mainColors, themeColors } from "../../utils/theme";
import { FaBarcode } from "react-icons/fa6";

const SelectorChart = ({ openDetailedView }) => {
	const { changeTab, currentTab } = useTab();
	return (
		<div className='flex flex-col items-stretch justify-start gap-1 text-[10px] w-full'>
			<div className='flex flex-row items-end self-end justify-start px-8 '>
				<div
					className={clsx(
						{ "bg-orange-main/10 border-orange-main": currentTab === "bar" },
						"py-1 pl-2 pr-2 border rounded-l-sm border-gray-text cursor-pointer flex justify-center items-center"
					)}
					onClick={() => {
						changeTab("bar");
					}}
				>
					<MdBarChart
						size={14}
						className='transition-all duration-300 rotate-180'
						color={
							currentTab === "bar"
								? mainColors["orange-main"]
								: themeColors["gray-text"]
						}
					/>
				</div>
				<div
					className={clsx(
						{ "bg-pink-main/10 border-pink-main": currentTab === "heat" },
						"py-1 pl-2 flex justify-center items-center pr-2 border cursor-pointer rounded-r-sm border-gray-text"
					)}
					onClick={() => {
						changeTab("heat");
					}}
				>
					<FaBarcode
						size={14}
						className='transition-all duration-300 rotate-90'
						color={
							currentTab === "heat"
								? mainColors["pink-main"]
								: themeColors["gray-text"]
						}
					/>
				</div>
			</div>
			{currentTab === "bar" ? (
				<FullBarGraph
					width={graphInfo.fullBarGraph.dimensions.width}
					height={graphInfo.fullBarGraph.dimensions.height}
					margin={graphInfo.fullBarGraph.dimensions.margin}
					openDetailedView={openDetailedView}
				/>
			) : (
				<Heatmap
					width={graphInfo.fullHeatMap.dimensions.width}
					height={graphInfo.fullHeatMap.dimensions.height}
					margin={graphInfo.fullHeatMap.dimensions.margin}
				/>
			)}
		</div>
	);
};

export default SelectorChart;
