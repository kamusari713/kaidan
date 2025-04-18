import { createComment } from '@/src/api/rest/comment'
import { getQueryKey } from '@/src/lib'
import { Comment, NewComment } from '@/src/lib/types/comments'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface CommentContext {
	previous?: Comment[]
	queryKey: string[]
}

export const useComment = () => {
	const queryClient = useQueryClient()

	return useMutation<Comment, Error, NewComment, CommentContext>({
		mutationFn: (newComment: NewComment) => createComment(newComment),

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

		onError: (_error, _variables, context) => {
			if (context?.previous && context.queryKey) {
				queryClient.setQueryData(context.queryKey, context.previous)
			}
		},

		onSettled: (_error, _variables, _result, context) => {
			if (context?.queryKey) {
				queryClient.invalidateQueries({ queryKey: context.queryKey })
			}
		},
	})
}
