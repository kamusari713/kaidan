import { getUserReviews } from '@/services/rest/user/profile'
import { Review } from '@/types/review'
import { useQuery } from '@tanstack/react-query'

export const useUserReviews = (userId: string) => {
	const {
		data: reviewsData,
		isLoading,
		error,
	} = useQuery<Review[]>({
		queryKey: ['user-reviews', userId],
		queryFn: () => getUserReviews(userId),
	})
	return { reviewsData, isLoading, error }
}
