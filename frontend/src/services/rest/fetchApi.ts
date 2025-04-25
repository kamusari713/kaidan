import { apiClient } from '@/lib/clients'
import { AxiosRequestConfig } from 'axios'

export const fetchApi = async <T>(config: AxiosRequestConfig): Promise<T> => {
	const response = await apiClient.request<T>(config)
	return response.data
}
