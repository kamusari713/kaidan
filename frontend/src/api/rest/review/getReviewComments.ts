import { fetchApi } from '@/src/api/rest/fetchApi'
import { Comment } from '@/src/lib/types/comments'

export const getReviewComments = async (reviewId: string): Promise<Comment[]> => {
	return fetchApi<Comment[]>({
		method: 'GET',
		url: `/public/reviews/${reviewId}/comments`,
	})
}
