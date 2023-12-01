import Layout from "./components/molecules/Layout";
import StaticArea from "./components/molecules/StaticArea";

function App() {
	return (
		<Layout>
			<Header header={"ReelInsider"} />
			<StaticArea />
		</Layout>
	);
}

export default App;

const Header = ({ header }) => {
	return (
		<div className='fixed top-0 left-[20px] px-5 py-[6px] text-3xl text-white z-[50] animate-colorShift font-bebas bg-black/40 backdrop-blur-xl rounded-b-2xl border-[1px] shadow-[0_0_2px_1px_rgba(255,255,255,0.03)] border-white/10'>
			{header}
		</div>
	);
};
