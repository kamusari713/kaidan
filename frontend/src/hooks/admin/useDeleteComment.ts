import { deleteComment } from '@/services/rest/admin'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useDeleteComment = () => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (commentId: string) => deleteComment(commentId),

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['anime-comments'] })
			queryClient.invalidateQueries({ queryKey: ['user-comments'] })
			queryClient.invalidateQueries({ queryKey: ['review-comments'] })
			toast.success('Комментарий удален!')
		},
	})
}
