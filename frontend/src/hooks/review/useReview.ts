import { GET_ANIME_DATA } from '@/src/api/graphql/anime'
import { createReview } from '@/src/api/rest/review'
import { apolloClient } from '@/src/lib/apolloClient'
import { NewReview, Review } from '@/src/lib/types/review'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface ReviewContext {
	previousReviews?: Review[]
	previousAverageScore?: number
	previousScoreCount?: number
}

export const useReview = (animeId: string) => {
	const queryClient = useQueryClient()

	return useMutation<Review, Error, NewReview, ReviewContext>({
		mutationFn: (newReview: NewReview) => createReview(newReview),

		onMutate: async (newReview) => {
			const reviewsKey = ['anime-reviews', animeId]

			await queryClient.cancelQueries({ queryKey: reviewsKey })
			const previousReviews = queryClient.getQueryData<Review[]>(reviewsKey)

			const optimisticReview: Review = {
				...newReview,
				id: `temp-${Date.now()}`,
				likes: 0,
				dislikes: 0,
				userVote: null,
			}
			queryClient.setQueryData<Review[]>(reviewsKey, (old) => (old ? [optimisticReview, ...old] : [optimisticReview]))

			const animeData = apolloClient.readQuery({
				query: GET_ANIME_DATA,
				variables: { shikimoriId: animeId },
			})

			const previousAverageScore = animeData?.anime?.averageScore || 0
			const previousScoreCount = animeData?.anime?.scoreCount || 0

			const newAverageScore = (previousAverageScore * previousScoreCount + newReview.score) / (previousScoreCount + 1)

			apolloClient.writeQuery({
				query: GET_ANIME_DATA,
				variables: { shikimoriId: animeId },
				data: {
					anime: {
						...animeData?.anime,
						averageScore: newAverageScore,
						scoreCount: previousScoreCount + 1,
					},
				},
			})

			return {
				previousReviews,
				previousAverageScore,
				previousScoreCount,
			}
		},

		onError: (_error, _variables, context) => {
			if (context?.previousReviews) {
				queryClient.setQueryData(['anime-reviews', animeId], context.previousReviews)
			}

			if (context?.previousAverageScore !== undefined && context.previousScoreCount !== undefined) {
				apolloClient.writeQuery({
					query: GET_ANIME_DATA,
					variables: { shikimoriId: animeId },
					data: {
						anime: {
							...apolloClient.readQuery({
								query: GET_ANIME_DATA,
								variables: { shikimoriId: animeId },
							})?.anime,
							averageScore: context.previousAverageScore,
							scoreCount: context.previousScoreCount,
						},
					},
				})
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['anime-reviews', animeId] })
			apolloClient.refetchQueries({
				include: [GET_ANIME_DATA],
			})
		},
	})
}
