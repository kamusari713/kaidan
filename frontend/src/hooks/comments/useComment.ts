import { getQueryKey } from '@/lib/getQueryKey'
import { createComment } from '@/services/rest/comment'
import { Comment, NewComment } from '@/types/comment'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { useAuthorize } from '../authentication'

interface CommentContext {
	previous?: Comment[]
	queryKey: string[]
}

export const useComment = () => {
	const queryClient = useQueryClient()
	const { userData } = useAuthorize()

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
			queryClient.invalidateQueries({ queryKey: context?.queryKey })
			queryClient.invalidateQueries({ queryKey: ['user-comments'] })

			if (userData?.id) {
				queryClient.invalidateQueries({
					queryKey: ['user-comments', userData.id],
				})
			}
			toast.success('Комментарий успешно опубликован!')
		},
	})
}
