import { fetchApi } from '@/src/api/rest/fetchApi'
import { Review } from '@/src/lib/types/review'

export const getUserReviews = async (userId: string): Promise<Review[]> => {
	return fetchApi<Review[]>({
		method: 'GET',
		url: `/public/user/${userId}/profiles/reviews`,
	})
}
