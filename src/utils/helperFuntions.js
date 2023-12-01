export const clipText = (value, length) =>
	value.length <= length ? value : value.substr(0, length) + "...";

export const polarToCartesian = (angle, distance) => {
	const x = distance * Math.cos(angle);
	const y = distance * Math.sin(angle);
	return { x, y };
};
