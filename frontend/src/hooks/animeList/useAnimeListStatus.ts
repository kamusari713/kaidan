import { getUserAnimeStatus } from '@/services/rest/anime'
import { AnimeListStatus } from '@/types/animeList'
import { useQuery } from '@tanstack/react-query'

export const useUserAnimeStatus = (userId: string, animeId: string) => {
	const {
		data: animeStatus,
		isLoading,
		isError,
		error,
	} = useQuery<AnimeListStatus | null>({
		queryKey: ['anime-status', animeId],
		queryFn: async () => getUserAnimeStatus(userId, animeId),
	})
	return { animeStatus, isLoading, isError, error }
}
