import { useState, useContext, createContext } from "react";
const initialState = { currentTab: "bar", changeTab: () => {} };
const TabContext = createContext({ ...initialState });

const TabContextProvider = ({ children }) => {
	const [currentTab, setCurrentTab] = useState(initialState.currentTab);
	const changeTab = (value) => setCurrentTab(value);
	return (
		<TabContext.Provider value={{ currentTab, changeTab }}>
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
