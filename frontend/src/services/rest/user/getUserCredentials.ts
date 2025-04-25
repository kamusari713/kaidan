import { fetchApi } from '@/services/rest/fetchApi'
import { UserCredentials } from '@/types/authentication'

export const getUserCredentials = async (): Promise<UserCredentials> => {
	return fetchApi<UserCredentials>({
		method: 'GET',
		url: '/private/auth/credentials',
	})
}
