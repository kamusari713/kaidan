import { fetchApi } from '@/services/rest/fetchApi'

export const deleteComment = async (commentId: string): Promise<void> => {
	return fetchApi<void>({
		method: 'DELETE',
		url: `/admin/comments/${commentId}`,
	})
}
