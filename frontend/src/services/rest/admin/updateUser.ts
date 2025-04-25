import { fetchApi } from '@/services/rest/fetchApi'
import { UserDTO } from '@/types/authentication'

export const updateUser = async (userId: string, data: UserDTO): Promise<UserDTO> => {
	return fetchApi<UserDTO>({
		method: 'PUT',
		url: `/admin/users/${userId}`,
		data,
	})
}
