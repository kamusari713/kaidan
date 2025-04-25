import { getReviewComments } from '@/services/rest/review'
import { Comment } from '@/types/comment'
import { useQuery } from '@tanstack/react-query'

export const useReviewComments = (reviewId: string) => {
	const {
		data: reviewCommentsData,
		isLoading,
		error,
	} = useQuery<Comment[]>({
		queryKey: ['review-comments', reviewId],
		queryFn: () => getReviewComments(reviewId),
		enabled: !!reviewId,
	})
	return { reviewCommentsData, isLoading, error }
}
