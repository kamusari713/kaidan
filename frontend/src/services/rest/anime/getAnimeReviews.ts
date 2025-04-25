import { fetchApi } from '@/services/rest/fetchApi'
import { Review } from '@/types/review'

export const getAnimeReviews = async (animeId: string): Promise<Review[]> => {
	return fetchApi<Review[]>({
		method: 'GET',
		url: `/public/anime/${animeId}/reviews`,
	})
}
