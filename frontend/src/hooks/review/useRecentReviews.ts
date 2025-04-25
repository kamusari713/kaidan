import { getRecentReviews } from '@/services/rest/review'
import { ReviewCardDTO } from '@/types/review'
import { useQuery } from '@tanstack/react-query'

export const useRecentReviews = () => {
	const { data: reviewsData, isLoading } = useQuery<ReviewCardDTO[]>({
		queryKey: ['recent-reviews'],
		queryFn: () => getRecentReviews(),
	})
	return { reviewsData, isLoading }
}
