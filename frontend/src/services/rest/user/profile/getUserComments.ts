import { fetchApi } from '@/services/rest/fetchApi'
import { CommentCardDTO } from '@/types/profile'

export const getUserCommens = async (userId: string): Promise<CommentCardDTO[]> => {
	return fetchApi<CommentCardDTO[]>({
		method: 'GET',
		url: `/public/user/${userId}/profiles/comments`,
	})
}
