import { fetchApi } from '@/services/rest/fetchApi'
import { PageableContent } from '@/types/pagination'
import { UserDTO } from '@/types/user'

export const getUsers = async (page: number, size: number, orderBy: string, direction: boolean): Promise<PageableContent<UserDTO>> => {
	return fetchApi<PageableContent<UserDTO>>({
		method: 'GET',
		url: `/admin/users?page=${page}&size=${size}&orderBy=${orderBy}&direction=${direction}`,
	})
}
