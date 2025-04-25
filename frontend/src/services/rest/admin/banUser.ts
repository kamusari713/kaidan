import { fetchApi } from '@/services/rest/fetchApi'

export const banUser = async (userId: string, banned: boolean): Promise<void> => {
	return fetchApi<void>({
		method: 'DELETE',
		url: `/admin/users/${userId}`,
		data: banned,
	})
}
