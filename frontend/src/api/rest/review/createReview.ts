import { fetchApi } from '@/src/api/rest/fetchApi'
import { NewReview, Review } from '@/src/lib/types/review'

export const createReview = async (review: NewReview): Promise<Review> => {
	return fetchApi<Review>({
		method: 'POST',
		url: '/private/reviews',
		data: review,
	})
}
