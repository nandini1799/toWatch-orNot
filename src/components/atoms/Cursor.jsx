import { useSpring, animated } from "react-spring";
const Cursor = ({ x, y, height, color }) => {
	const springProps = useSpring({
		to: {
			x,
			y,
		},
	});

	if (!springProps.x) {
		return null;
	}

	return (
		<>
			<animated.line
				x1={springProps.x}
				x2={springProps.x}
				y1={0}
				y2={height}
				stroke={color}
				strokeWidth={1}
			/>
			{/* <circle cx={x} cy={y} r={5} fill={color} /> */}
		</>
	);
};

export default Cursor;
