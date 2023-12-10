import clsx from "clsx";
import React from "react";
import { mainColors } from "../../utils/theme";
import { useTab } from "../../contexts/TabContext";

const Legends = ({ legends, classes, isController }) => {
	const { selectedLegend, changeSelectedLegend } = useTab();

	if (!isController) {
		return (
			<div className={classes}>
				{legends.map(({ id, label, color }) => (
					<div
						className='flex items-center justify-start gap-2 leading-4'
						key={id}
					>
						<div
							className={clsx(`w-3 h-3`)}
							style={{ backgroundColor: mainColors[color] }}
						/>
						<p>{label}</p>
					</div>
				))}
			</div>
		);
	} else {
		const reset = (
			<div
				onClick={() => {
					changeSelectedLegend("");
				}}
				className='flex items-center justify-start p-2 leading-4 rounded-md cursor-pointer hover:bg-gray-text/10'
			>
				<p className='text-gray-text'>Reset</p>
			</div>
		);
		return (
			<div className={classes}>
				{legends.map(({ id, label, color, colorCode }) => (
					<div
						onClick={() => {
							changeSelectedLegend(mainColors[color]);
						}}
						style={{
							backgroundColor: selectedLegend === colorCode && colorCode + 20,
						}}
						className={clsx(
							`cursor-pointer flex items-center justify-start py-2 px-2 leading-4 rounded-md hover:bg-gray-text/10`
						)}
						key={id}
					>
						<p className='font-semibold' style={{ color: colorCode }}>
							{label}
						</p>
					</div>
				))}
				{reset}
			</div>
		);
	}
};

export default Legends;

// [{id:1,label:"asda", color:"abc"}]
