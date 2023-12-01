import React, { createContext, useContext, useEffect, useState } from "react";
import { getAPI } from "../utils/axiosHelper";

const initState = {
	selectedYear: 2019,
	setSelectedYear: (year) => {},
	allMoviesByImdbAndReleaseDate: [],
};

const GraphInteractivityContext = createContext({ ...initState });

const GraphInteractivityContextProvider = ({ children }) => {
	const [allMoviesByImdbAndReleaseDate, setAllMoviesByImdnAndRelease] =
		useState([]);

	useEffect(() => {
		(async () => {
			try {
				const { isError, data } = await getAPI(`/movies/all`);
				if (isError) throw new Error("getting grouped Api failed.");
				if (data) {
					setAllMoviesByImdnAndRelease(data.allMoviesByImdbAndReleaseDate);

					//TODO: call all the static graphs data here at one place!
				}
			} catch (err) {
				throw new Error(err);
			}
		})();
	}, []);

	const [selectedYear, setSelectedYear] = useState(2019);
	const selectDifferentYear = (year) => {
		setSelectedYear(year);
	};

	return (
		<GraphInteractivityContext.Provider
			value={{
				selectedYear,
				setSelectedYear: selectDifferentYear,
				allMoviesByImdbAndReleaseDate,
			}}
		>
			{children}
		</GraphInteractivityContext.Provider>
	);
};

export const useGraphInteractivity = () => {
	const context = useContext(GraphInteractivityContext);
	if (!context) {
		throw new Error(
			"Please Wrap these components in GraphInteractivityContextProvider"
		);
	}
	return context;
};

export default GraphInteractivityContextProvider;
