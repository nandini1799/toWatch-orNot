import Header from "./components/atoms/Header";
import Layout from "./components/molecules/Layout";
import StaticArea from "./components/molecules/StaticArea";
import { ABOUT, HEADER } from "./utils/constants";

function App() {
	return (
		<Layout>
			<Header header={HEADER} about={ABOUT} />
			<StaticArea />
		</Layout>
	);
}

export default App;
