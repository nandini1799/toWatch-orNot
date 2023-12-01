import { createContext, useContext, useState } from "react";

const initState = {
	setGraphInfoToggleState: (graphName) => {},
	graphInfoToggleState: {
		showPieChartInfo: false,
		showConnectedScatterChartInfo: false,
		showGroupBarChartInfo: false,
		showStackedBarChartInfo: false,
		showHeatMapChartInfo: false,
		showSpiderWebChart1Info: false,
		showSpiderWebChart2Info: false,
	},
};

const GraphInfoContext = createContext({ ...initState });

const GraphInfoContextProvider = ({ children }) => {
	const [toggleState, setToggleState] = useState({
		...initState.graphInfoToggle,
	});
	const setGraphToggleState = (name, bool) => {
		setToggleState((prev) => ({ ...prev, [name]: bool }));
	};
	return (
		<GraphInfoContext.Provider
			value={{
				setGraphInfoToggleState: setGraphToggleState,
				graphInfoToggleState: toggleState,
			}}
		>
			{children}
		</GraphInfoContext.Provider>
	);
};

export const useGraphInfoToggle = () => {
	const context = useContext(GraphInfoContext);

	if (!context) throw new Error("please wrap in graphInfoToggleProvider");

	return context;
};
export const toggleInfoStateKeys = {
	showPieChartInfo: "showPieChartInfo",
	showConnectedScatterChartInfo: "showConnectedScatterChartInfo",
	showGroupBarChartInfo: "showGroupBarChartInfo",
	showStackedBarChartInfo: "showStackedBarChartInfo",
	showHeatMapChartInfo: "showHeatMapChartInfo",
	showSpiderWebChart1Info: "showSpiderWebChart1Info",
	showSpiderWebChart2Info: "showSpiderWebChart2Info",
};

export default GraphInfoContextProvider;
