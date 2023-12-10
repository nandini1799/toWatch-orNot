import { createContext, useContext, useEffect, useState } from "react";
import { getAPI } from "../utils/axiosHelper";
import {
	shiftDataChange,
	transformByAudienceTypeData,
	transformImdbHeatMapData,
	transformPieChartDataToShowGivenColorsOnly,
	transformShiftDataChange,
	transformTop10MoviesByRevenueTypeData,
} from "../utils/d3-transformer";
import { useGraphInteractivity } from "./InteractivityContext";

const initialState = {
	movies: [],
	isLoading: false,
	byAudienceType: {},
	byRevenueType: {},
	byScriptType: {},
	top10WorldWideGross: [],
	genreShift: {},
	runtimeShift: {},
	imdbHeatMap: {},
};
const MoviesContext = createContext(initialState);

const MoviesContextProvider = ({ children }) => {
	const [movies, setMovies] = useState([]);
	const [byAudienceType, setByAudienceType] = useState([]);
	const [byScriptType, setByScriptType] = useState({});
	const [byRevenueType, setByRevenueType] = useState({});
	const [top10WorldWideGross, setTop10WorldWideGross] = useState([]);
	const [genreShift, setGenreShift] = useState([]);
	const [runtimeShift, setRuntimeShift] = useState([]);
	const [imdbHeatMap, setImdbHeatMap] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const { selectedYear } = useGraphInteractivity();

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { isError, data } = await getAPI(`/movies/${selectedYear}`);
				if (isError) throw new Error("getting grouped Api failed.");
				if (data) {
					setMovies(data.movies);
					setByAudienceType(() => {
						return transformByAudienceTypeData(data.byAudienceType);
					});
					setByRevenueType(data.byRevenueType);
					setByScriptType(() => {
						return transformPieChartDataToShowGivenColorsOnly(
							data.byScriptType,
							4
						);
					});
					setTop10WorldWideGross(() => {
						return transformTop10MoviesByRevenueTypeData(
							data.top10WorldWideGross
						);
					});
					setIsLoading(false);
				}
			} catch (err) {
				setIsLoading(false);
				throw new Error(err);
			}
		})();
	}, [selectedYear]);

	useEffect(() => {
		(async () => {
			setIsLoading(true);
			try {
				const { isError, data } = await getAPI(`/movies/`);
				if (isError) throw new Error("getting grouped Api failed.");
				if (data) {
					console.log(shiftDataChange(data.genreShift));
					setImdbHeatMap(() => transformImdbHeatMapData(data.heatMapIMDB));
					setGenreShift(() => transformShiftDataChange(data.genreShift));
					setRuntimeShift(() =>
						transformShiftDataChange(data.runtimeShift, true)
					);
				}
				setIsLoading(false);
			} catch (err) {
				setIsLoading(false);
				throw new Error(err);
			}
		})();
	}, []);

	return (
		<MoviesContext.Provider
			value={{
				movies,
				byAudienceType,
				byRevenueType,
				byScriptType,
				top10WorldWideGross,
				isLoading,
				imdbHeatMap,
				genreShift,
				runtimeShift,
			}}
		>
			{children}
		</MoviesContext.Provider>
	);
};

export const useMovies = () => {
	const context = useContext(MoviesContext);

	if (!context) throw new Error("please wrap in moviesProvider");

	return context;
};

export default MoviesContextProvider;
