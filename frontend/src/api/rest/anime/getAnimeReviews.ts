import { fetchApi } from '@/src/api/rest/fetchApi'
import { Review } from '@/src/lib/types/review'

export const getAnimeReviews = async (animeId: string): Promise<Review[]> => {
	return fetchApi<Review[]>({
		method: 'GET',
		url: `/public/anime/${animeId}/reviews`,
	})
}
