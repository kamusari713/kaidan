import { fetchApi } from '@/services/rest/fetchApi'
import { Review, ReviewVoteDTO } from '@/types/review'

export const createReviewVote = async (vote: ReviewVoteDTO): Promise<Review> => {
	return fetchApi<Review>({
		method: 'POST',
		url: `/private/reviews/${vote.reviewId}/vote`,
		data: vote,
	})
}
