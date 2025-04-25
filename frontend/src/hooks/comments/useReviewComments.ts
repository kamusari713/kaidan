import { getReviewComments } from '@/services/rest/review'
import { Comment } from '@/types/comments'
import { useQuery } from '@tanstack/react-query'

export const useReviewComments = (reviewId: string) =>
	useQuery<Comment[]>({
		queryKey: ['review-comments', reviewId],
		queryFn: () => getReviewComments(reviewId),
		enabled: !!reviewId,
	})
