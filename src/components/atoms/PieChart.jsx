import { useMemo, useRef, useState } from "react";
import * as d3 from "d3";
import { useMovies } from "../../contexts/MoviesContext";
import { mainColors, themeColors } from "../../utils/theme";
import clsx from "clsx";

const colors = [
	...Object.values(mainColors).filter((e, i) => i < 4),
	themeColors["gray-text"],
];

export const PieChart = ({ width, height, margin, infPadding = 0 }) => {
	const { byScriptType: data } = useMovies();
	const radius = Math.min(width, height) / 2 - margin;

	const pie = useMemo(() => {
		const pieGenerator = d3.pie().value((d) => d.value);
		return pieGenerator(data);
	}, [data]);

	const arcs = useMemo(() => {
		const arcPathGenerator = d3.arc();
		return pie.map((p, i) => {
			const sliceInfo = {
				innerRadius: 0,
				outerRadius: radius,
				startAngle: p.startAngle,
				endAngle: p.endAngle,
			};
			const centroid = arcPathGenerator.centroid(sliceInfo);
			const slicePath = arcPathGenerator(sliceInfo);

			const inflexionInfo = {
				innerRadius: radius + infPadding,
				outerRadius: radius + infPadding,
				startAngle: p.startAngle,
				endAngle: p.endAngle,
			};
			const inflexionPoint = arcPathGenerator.centroid(inflexionInfo);

			const isRightLabel = inflexionPoint[0] > 0;
			const labelPosX = inflexionPoint[0] + 25 * (isRightLabel ? 1 : -3);
			const textAnchor = isRightLabel ? "start" : "end";
			const label = p.data.label + " (" + p.value + ")";

			return (
				<g key={i}>
					<path d={slicePath} fill={colors[i]} />
					<circle
						fill={themeColors.black}
						cx={centroid[0]}
						cy={centroid[1]}
						r={2}
					/>
					<line
						x1={centroid[0]}
						y1={centroid[1]}
						x2={inflexionPoint[0]}
						y2={inflexionPoint[1]}
						stroke={themeColors.black}
						fill={themeColors.black}
					/>
					<line
						x1={inflexionPoint[0]}
						y1={inflexionPoint[1]}
						x2={labelPosX}
						y2={inflexionPoint[1]}
						stroke={colors[i]}
						fill={colors[i]}
					/>
					<g x={labelPosX + (isRightLabel ? 2 : -2)} y={inflexionPoint[1]}>
						{label.split(" ").map((l, j) => (
							<text
								x={labelPosX + (isRightLabel ? 2 : -2)}
								y={inflexionPoint[1] + j * 20}
								key={l}
								textAnchor={textAnchor}
								dominantBaseline='middle'
								fill={colors[i]}
								className='text-sm'
							>
								{l}
							</text>
						))}
					</g>
				</g>
			);
		});
	}, [radius, pie, infPadding]);

	return (
		<svg className='w-full h-full' viewBox={`0 0 ${width} ${height}`}>
			<g transform={`translate(${width / 2}, ${height / 2})`}>{arcs}</g>
		</svg>
	);
};
