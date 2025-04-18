import { createReviewVote } from '@/src/api/rest/review'
import { Review, ReviewVoteDTO } from '@/src/lib/types/review'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface VoteContext {
	previous?: Review[]
}

export const useVoteForReview = (animeId: string) => {
	const queryClient = useQueryClient()

	return useMutation<Review, Error, ReviewVoteDTO, VoteContext>({
		mutationFn: (reviewVoteDTO: ReviewVoteDTO) => createReviewVote(reviewVoteDTO),

		onMutate: async (vote) => {
			const queryKey = ['anime-reviews', animeId]
			await queryClient.cancelQueries({ queryKey })
			const previous = queryClient.getQueryData<Review[]>(queryKey)
			queryClient.setQueryData<Review[]>(queryKey, (old) => {
				if (!old) return old
				return old.map((review) => {
					if (review.id === vote.reviewId) {
						const likes = review.likes + (vote.vote === 'LIKE' ? 1 : 0)
						const dislikes = review.dislikes + (vote.vote === 'DISLIKE' ? 1 : 0)
						return { ...review, likes, dislikes, userVote: vote.vote }
					}
					return review
				})
			})
			return { previous }
		},

		onError: (_error, _vote, context) => {
			if (context?.previous) {
				queryClient.setQueryData(['anime-reviews', animeId], context.previous)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['anime-reviews', animeId] })
		},
	})
}
