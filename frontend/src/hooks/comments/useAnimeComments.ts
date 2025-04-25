import { getAnimeComments } from '@/services/rest/anime'
import { Comment } from '@/types/comments'
import { useQuery } from '@tanstack/react-query'

export const useAnimeComments = (animeId: string) => {
	const {
		data: commentsData,
		isLoading,
		isError,
		error,
	} = useQuery<Comment[]>({
		queryKey: ['anime-comments', animeId],
		queryFn: () => getAnimeComments(animeId),
		staleTime: 5 * 60 * 1000,
		enabled: !!animeId,
	})
	return { commentsData, isLoading, isError, error }
}
