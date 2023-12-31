import { useState, useContext, createContext } from "react";
const initialState = {
	currentTab: "bar",
	changeTab: () => {},
	selectedLegend: "",
	changeSelectedLegend: () => {},
	sharedCursor: "",
	setSharedCursorPosition: () => {},
};
const TabContext = createContext({ ...initialState });

const TabContextProvider = ({ children }) => {
	const [currentTab, setCurrentTab] = useState(initialState.currentTab);
	const [selectedLegend, setSelectedLegend] = useState("");
	const [sharedCursor, setSharedCursor] = useState(null);
	const changeSelectedLegend = (value) => {
		setSelectedLegend(value);
	};
	const setSharedCursorPosition = (position) => {
		setSharedCursor(position);
	};
	const changeTab = (value) => setCurrentTab(value);
	return (
		<TabContext.Provider
			value={{
				currentTab,
				changeTab,
				selectedLegend,
				changeSelectedLegend,
				sharedCursor,
				setSharedCursorPosition,
			}}
		>
			{children}
		</TabContext.Provider>
	);
};

export const useTab = () => {
	const context = useContext(TabContext);

	if (!context) throw new Error("please wrap in tabProvider");

	return context;
};

export default TabContextProvider;
