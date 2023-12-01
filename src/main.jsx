import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import TabContextProvider from "./contexts/TabContext.jsx";
import MoviesContextProvider from "./contexts/MoviesContext.jsx";
import GraphInfoContextProvider from "./contexts/GraphInfoContext.jsx";
import GraphInteractivityContextProvider from "./contexts/InteractivityContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
	<GraphInteractivityContextProvider>
		<MoviesContextProvider>
			<TabContextProvider>
				<GraphInfoContextProvider>
					<App />
				</GraphInfoContextProvider>
			</TabContextProvider>
		</MoviesContextProvider>
	</GraphInteractivityContextProvider>
);
