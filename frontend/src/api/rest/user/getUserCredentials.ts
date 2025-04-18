import { fetchApi } from '@/src/api/rest/fetchApi'
import { UserCredentials } from '@/src/lib/types/authentication'

export const getUserCredentials = async (): Promise<UserCredentials> => {
	return fetchApi<UserCredentials>({
		method: 'GET',
		url: '/private/auth/credentials',
	})
}
