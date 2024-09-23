import axiosInstance from "./axiosInstance";
import { setLoader } from "../../redux/Actions/UserAction";
import store from "../../redux/Store";

/**
 * Common API function to handle GET, POST, PUT, DELETE requests.
 * Supports both JSON and FormData payloads.
 *
 * @param {string} method - HTTP method (get, post, put, delete)
 * @param {string} url - API endpoint URL
 * @param {object|FormData} [data] - Optional data for POST, PUT requests (JSON or FormData)
 * @param {object} [config] - Optional axios config (e.g., headers, params)
 * @returns {Promise} - API response or error
 */
const apiCall = async (method, url, data = null, config = {}) => {
	try {
		store.dispatch(setLoader(true));
		const isFormData = data instanceof FormData;
		const defaultHeaders = isFormData
			? { "Content-Type": "multipart/form-data" }
			: { "Content-Type": "application/json" };

		const axiosConfig = {
			method,
			url,
			data,
			headers: {
				...defaultHeaders,
				...(config.headers || {}), // Merge additional headers if any
			},
			...config, // Merge additional config (e.g., query params)
		};

		const response = await axiosInstance(axiosConfig);
		return response.data;
	} catch (error) {
		console.log(`API ${method.toUpperCase()} error:`, error);
		throw error;
	} finally {
		setTimeout(() => {
			store.dispatch(setLoader(false));
		}, 200);
	}
};

export default apiCall;
