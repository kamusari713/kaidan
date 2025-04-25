import { fetchApi } from '@/services/rest/fetchApi'
import { Comment } from '@/types/comments'

export const getReviewComments = async (reviewId: string): Promise<Comment[]> => {
	return fetchApi<Comment[]>({
		method: 'GET',
		url: `/public/reviews/${reviewId}/comments`,
	})
}
