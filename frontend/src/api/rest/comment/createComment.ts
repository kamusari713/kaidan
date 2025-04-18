import { fetchApi } from '@/src/api/rest/fetchApi'
import { Comment, NewComment } from '@/src/lib/types/comments'

export const createComment = async (newComment: NewComment): Promise<Comment> => {
	return fetchApi<Comment>({
		method: 'POST',
		url: '/private/comments',
		data: newComment,
	})
}
