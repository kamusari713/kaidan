import { fetchApi } from '@/services/rest/fetchApi'
import { Comment, NewComment } from '@/types/comments'

export const createComment = async (newComment: NewComment): Promise<Comment> => {
	return fetchApi<Comment>({
		method: 'POST',
		url: '/private/comments',
		data: newComment,
	})
}
