import { getReviewComments } from '@/src/api/rest/review'
import { Comment } from '@/src/lib/types/comments'
import { useQuery } from '@tanstack/react-query'

export const useReviewComments = (reviewId: string) =>
	useQuery<Comment[]>({
		queryKey: ['review-comments', reviewId],
		queryFn: () => getReviewComments(reviewId),
		staleTime: 5 * 60 * 1000,
		enabled: !!reviewId,
	})
