import { fetchApi } from '@/src/api/rest/fetchApi'
import { AuthResponse, LoginData } from '@/src/lib/types/authentication'

export const loginUser = async (data: LoginData): Promise<AuthResponse> => {
	return fetchApi<AuthResponse>({
		method: 'POST',
		url: '/public/auth/login',
		data,
	})
}
