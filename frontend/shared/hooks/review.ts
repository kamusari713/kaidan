import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addReview, addReviewVote, getAnimeReviews, getReviewComments } from '@/shared/api/actions'
import { Review } from '@/shared/types/anime-page/review'
import { Comment } from '@/shared/types/anime-page/comments'

export const useAddReview = (animeId: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['anime-reviews', animeId] })
		},
	})
}

export const useAnimeReviews = (animeId: string) =>
	useQuery<Review[]>({
		queryKey: ['anime-reviews', animeId],
		queryFn: async () => getAnimeReviews(animeId),
		enabled: !!animeId,
	})

export const useReviewComments = (reviewId: string) =>
	useQuery<Comment[]>({
		queryKey: ['review-comments', reviewId],
		queryFn: async () => getReviewComments(reviewId),
		enabled: !!reviewId,
	})

export const useVoteForReview = (animeId: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addReviewVote,

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['anime-reviews', animeId] })
		},
		onSuccess: (updatedReview) => {
			queryClient.setQueryData<Review[]>(['anime-reviews', animeId], (old = []) => old.map((rev) => (rev.id === updatedReview.id ? updatedReview : rev)))
		},
	})
}
