import { fetchApi } from '@/services/rest/fetchApi'
import { Comment } from '@/types/comments'

export const getAnimeComments = async (animeId: string): Promise<Comment[]> => {
	return fetchApi<Comment[]>({
		method: 'GET',
		url: `/public/anime/${animeId}/comments`,
	})
}
