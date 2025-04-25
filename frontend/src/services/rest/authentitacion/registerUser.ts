import { fetchApi } from '@/services/rest/fetchApi'
import { RegisterData } from '@/types/authentication'

export const registerUser = async (data: RegisterData): Promise<void> => {
	return fetchApi<void>({
		method: 'POST',
		url: '/public/auth/users',
		data,
	})
}
