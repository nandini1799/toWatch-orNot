import { useState, useContext, createContext } from "react";
const initialState = {
	currentTab: "bar",
	changeTab: () => {},
	selectedLegend: "",
	changeSelectedLegend: () => {},
};
const CursorContext = createContext({ ...initialState });

const TabContextProvider = ({ children }) => {
	const [currentTab, setCurrentTab] = useState(initialState.currentTab);
	const [selectedLegend, setSelectedLegend] = useState("");
	const changeSelectedLegend = (value) => {
		setSelectedLegend(value);
	};
	const changeTab = (value) => setCurrentTab(value);
	return (
		<CursorContext.Provider
			value={{ currentTab, changeTab, selectedLegend, changeSelectedLegend }}
		>
			{children}
		</CursorContext.Provider>
	);
};

export const useCursor = () => {
	const context = useContext(CursorContext);

	if (!context) throw new Error("please wrap in tabProvider");

	return context;
};

export default TabContextProvider;
