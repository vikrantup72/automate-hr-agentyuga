import axios from "axios";

// Create an Axios instance
const axiosInstance = axios.create({
	baseURL:
		"https://9fc1-2409-408a-8110-cbba-71d8-cded-5f19-e991.ngrok-free.app",
	timeout: 5000,
	headers: {
		"Content-Type": "application/json",
		"ngrok-skip-browser-warning": "69420",
	},
});

// Request Interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		// If token doesn't exist, API call will proceed without it.
		return config;
	},
	(error) => Promise.reject(error)
);

// Response Interceptor
axiosInstance.interceptors.response.use(
	(response) => response,
	async (error) => {
		const originalRequest = error.config;

		if (
			error.response &&
			error.response.status === 401 &&
			!originalRequest._retry
		) {
			originalRequest._retry = true;
			try {
				const refreshToken = localStorage.getItem("refreshToken");

				if (!refreshToken) {
					// If no refresh token, reject the request
					return Promise.reject(error);
				}

				const { data } = await axios.post(
					"http://localhost:8000/auth/refresh",
					{
						token: refreshToken,
					}
				);

				localStorage.setItem("accessToken", data.accessToken);
				originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;
				return axiosInstance(originalRequest);
			} catch (refreshError) {
				console.error("Refresh token failed: ", refreshError);
				return Promise.reject(refreshError);
			}
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
