import clsx from "clsx";
import { useTab } from "../../contexts/TabContext";

const Tabs = () => {
	const { currentTab, changeTab } = useTab();
	return (
		<div className='flex gap-3 text-lg font-semibold text-gray-text '>
			<p
				className={clsx(
					{ "text-pink-main bg-pink-main/5": currentTab === "grouped" },
					"px-3 py-2 cursor-pointer rounded"
				)}
				onClick={() => {
					changeTab("grouped");
				}}
			>
				Grouped
			</p>
			<p
				className={clsx(
					{ "text-orange-main bg-orange-main/5": currentTab === "overall" },
					"px-3 py-2 cursor-pointer  rounded"
				)}
				onClick={() => {
					changeTab("overall");
				}}
			>
				OverAll
			</p>
		</div>
	);
};

export default Tabs;
