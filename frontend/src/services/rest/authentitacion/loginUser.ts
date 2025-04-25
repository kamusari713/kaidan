import { fetchApi } from '@/services/rest/fetchApi'
import { LoginData } from '@/types/authentication'

export const loginUser = async (data: LoginData): Promise<void> => {
	return fetchApi<void>({
		method: 'POST',
		url: '/public/auth/sessions',
		data,
	})
}
