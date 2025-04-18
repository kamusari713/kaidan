import { fetchApi } from '@/src/api/rest/fetchApi'
import { AuthResponse, RegisterData } from '@/src/lib/types/authentication'

export const registerUser = async (data: RegisterData): Promise<AuthResponse> => {
	return fetchApi<AuthResponse>({
		method: 'POST',
		url: '/public/auth/register',
		data,
	})
}
