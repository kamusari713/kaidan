import { fetchApi } from '@/src/api/rest/fetchApi'
import { Comment } from '@/src/lib/types/comments'

export const getAnimeComments = async (animeId: string): Promise<Comment[]> => {
	return fetchApi<Comment[]>({
		method: 'GET',
		url: `/public/anime/${animeId}/comments`,
	})
}
