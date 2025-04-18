import axios from 'axios'

export const apiClient = axios.create({
	baseURL: 'http://localhost:8080/api',
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
})

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			// TODO: отправка /refresh
		}
		return Promise.reject(error)
	}
)
