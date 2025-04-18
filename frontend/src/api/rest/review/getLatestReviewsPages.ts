import { fetchApi } from '@/src/api/rest/fetchApi'
import { PageableContent } from '@/src/lib/types/pagination'
import { Review } from '@/src/lib/types/review'

export const getLatestReviewsPages = async (page: number, size: number): Promise<PageableContent<Review>> => {
	return fetchApi<PageableContent<Review>>({
		method: 'GET',
		url: `/public/reviews/latest?page=${page}$size=${size}`,
	})
}
