import axios from 'axios'

export const apiClient = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
})

apiClient.interceptors.response.use(
	(response) => response,
	(error) => {
		return Promise.reject(error)
	}
)
