import { fetchApi } from '@/services/rest/fetchApi'

export const refresh = async (): Promise<void> => {
	return fetchApi<void>({
		method: 'POST',
		url: '/public/auth/credentials',
	})
}
