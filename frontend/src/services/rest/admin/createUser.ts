import { fetchApi } from '@/services/rest/fetchApi'
import { RegisterFormData } from '@/types/form'

export const createUser = async (data: RegisterFormData): Promise<void> => {
	return fetchApi<void>({
		method: 'POST',
		url: '/admin/users',
		data: data,
	})
}
