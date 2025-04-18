import { getAnimeComments } from '@/src/api/rest/anime'
import { Comment } from '@/src/lib/types/comments'
import { useQuery } from '@tanstack/react-query'

export const useAnimeComments = (animeId: string) =>
	useQuery<Comment[]>({
		queryKey: ['anime-comments', animeId],
		queryFn: () => getAnimeComments(animeId),
		staleTime: 5 * 60 * 1000,
		enabled: !!animeId,
	})
