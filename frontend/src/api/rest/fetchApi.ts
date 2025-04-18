import { apiClient } from '@/src/lib'
import { AxiosRequestConfig } from 'axios'

export const fetchApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
	const response = await apiClient.request<T>(config)
	return response.data
}
