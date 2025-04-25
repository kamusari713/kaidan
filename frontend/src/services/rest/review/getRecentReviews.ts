import { fetchApi } from '@/services/rest/fetchApi'
import { ReviewCardDTO } from '@/types/review'

export const getRecentReviews = async (): Promise<ReviewCardDTO[]> => {
	return fetchApi<ReviewCardDTO[]>({
		method: 'GET',
		url: `/public/reviews/recent`,
	})
}
