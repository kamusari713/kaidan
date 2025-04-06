import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { addComment, getAnimeComments, getReviewComments } from '@/shared/api/actions'
import { Comment, NewComment } from '@/shared/types/anime-page/comments'

const getQueryKey = (comment: NewComment): (string | undefined)[] => {
	if (comment.animeId) return ['anime-comments', comment.animeId]
	if (comment.reviewId) return ['review-comments', comment.reviewId]
	throw new Error('Комментарий должен иметь либо animeId, либо reviewId')
}

export const useReviewComments = (reviewId: string) =>
	useQuery<Comment[]>({
		queryKey: ['review-comments', reviewId],
		queryFn: async () => getReviewComments(reviewId),
		staleTime: 5 * 60 * 1000,
		enabled: !!reviewId,
	})

export const useAnimeComments = (animeId: string) =>
	useQuery<Comment[]>({
		queryKey: ['anime-comments', animeId],
		queryFn: async () => getAnimeComments(animeId),
		staleTime: 5 * 60 * 1000,
		enabled: !!animeId,
	})

export const useAddComment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: addComment,

		onMutate: async (newComment) => {
			const queryKey = getQueryKey(newComment)
			await queryClient.cancelQueries({ queryKey })

			const previous = queryClient.getQueryData<Comment[]>(queryKey)

			const optimistic: Comment = {
				...newComment,
				id: 'temp-' + Date.now(),
				children: [],
			}

			queryClient.setQueryData<Comment[]>(queryKey, (old = []) => [optimistic, ...old])
			return { previous, queryKey }
		},

		onError: (_, __, context) => {
			if (context?.previous && context.queryKey) {
				queryClient.setQueryData(context.queryKey, context.previous)
			}
		},

		onSettled: (_, __, ____, context) => {
			if (context?.queryKey) {
				queryClient.invalidateQueries({ queryKey: context.queryKey })
			}
		},
	})
}
