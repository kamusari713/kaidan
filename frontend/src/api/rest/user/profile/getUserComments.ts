import { fetchApi } from '@/src/api/rest/fetchApi'
import { Comment } from '@/src/lib/types/comments'

export const getUserCommens = async (userId: string): Promise<Comment[]> => {
	return fetchApi<Comment[]>({
		method: 'GET',
		url: `/public/user/${userId}/profiles/comments`,
	})
}
