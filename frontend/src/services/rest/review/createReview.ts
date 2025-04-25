import { fetchApi } from '@/services/rest/fetchApi'
import { NewReview, Review } from '@/types/review'

export const createReview = async (review: NewReview): Promise<Review> => {
	return fetchApi<Review>({
		method: 'POST',
		url: '/private/reviews',
		data: review,
	})
}
