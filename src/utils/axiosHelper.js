import axios from "axios";

const baseUrl = import.meta.env.VITE_BASE_URL;

export const responseIsError = (resp) => {
	return "error" in resp && resp.isError;
};

const middlewareInstance = axios.create({});

//This interceptor will add the CSRF token to every request
middlewareInstance.interceptors.request.use(
	(config) => {
		config.baseURL = `${baseUrl}`;
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

export const getAPI = async (
	url,
	queryParams,
	config //can send signals too for request cancellation, etc.
) => {
	const searchParam = queryParams ? `${url}/${queryParams}` : url;
	return await middlewareInstance
		.get(searchParam, config)
		.then((response) => {
			return {
				isError: false,
				status: response.status,
				statusText: response.statusText,
				data: response.data,
			};
		})
		.catch((error) => {
			if (axios.isAxiosError(error) && error.response) {
				return {
					isError: true,
					status: error.response.status,
					statusText: error.response.statusText,
					error: error.response,
				};
			}

			//Need to decide on default error message
			return {
				isError: true,
				status: 500,
				statusText: "Server Error",
				error: "Default::Something went wrong",
			};
		});
};
export const postAPI = async (url, data, config) => {
	return await middlewareInstance
		.post(url, data, config)
		.then((response) => {
			return {
				isError: false,
				status: response.status,
				statusText: response.statusText,
				data: response.data,
			};
		})
		.catch((error) => {
			if (axios.isAxiosError(error) && error.response) {
				return {
					isError: true,
					status: error.response.status,
					statusText: error.response.statusText,
					error: error.response,
				};
			}
			//Need to decide on default error message
			return {
				isError: true,
				status: 500,
				statusText: "Server Error",
				error: "Default::Something went wrong",
			};
		});
};
