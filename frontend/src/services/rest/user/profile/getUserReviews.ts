import { fetchApi } from '@/services/rest/fetchApi'
import { Review } from '@/types/review'

export const getUserReviews = async (userId: string): Promise<Review[]> => {
	return fetchApi<Review[]>({
		method: 'GET',
		url: `/public/user/${userId}/profiles/reviews`,
	})
}
