import { fetchApi } from '@/services/rest/fetchApi'

export const logoutUser = async (): Promise<void> => {
	return fetchApi<void>({
		method: 'POST',
		url: '/private/auth/logout',
	})
}
