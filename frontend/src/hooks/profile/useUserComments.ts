import { getUserCommens } from '@/services/rest/user/profile'
import { CommentCardDTO } from '@/types/comment'
import { useQuery } from '@tanstack/react-query'

export const useUserComments = (userId: string) => {
	const {
		data: commentsData,
		isLoading,
		error,
	} = useQuery<CommentCardDTO[]>({
		queryKey: ['user-comments', userId],
		queryFn: () => getUserCommens(userId),
	})
	return { commentsData, isLoading, error }
}
