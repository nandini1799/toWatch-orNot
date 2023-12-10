import clsx from "clsx";
import React from "react";
import { clipText } from "../../utils/helperFuntions";
import { useTab } from "../../contexts/TabContext";
import { themeBasedOnSelector } from "../../utils/theme";

const InfoOverlay = ({ heading, content, isPartial, onRight }) => {
	const { currentTab } = useTab();
	const infoCardClass = clsx(
		isPartial ? "w-[50%]" : "w-full",
		isPartial && onRight ? "right-0" : "left-0",
		`absolute backdrop-blur-[15px] top-0 h-full bg-gray-950/90 z-10 rounded-lg text-center items-center justify-center flex flex-col gap-4 text-base animate-drop text-white transition-all duration-300 whitespace-pre-wrap px-4 py-5`
	);
	return (
		<div className={infoCardClass}>
			<h6
				className='text-2xl font-semibold font-bebas'
				style={{ color: themeBasedOnSelector[currentTab].mainColor }}
			>
				{heading}
			</h6>
			<p className='text-base font-light text-justify text-gray-text w-[90%]'>
				{clipText(content, 600)}
			</p>
		</div>
	);
};

export default InfoOverlay;
