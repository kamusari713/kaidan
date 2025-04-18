import { getUserAnimeStatus } from '@/src/api/rest/anime'
import { AnimeListStatus } from '@/src/lib/types/animeList'
import { useQuery } from '@tanstack/react-query'

export const useUserAnimeStatus = (userId: string, animeId: string) => {
	return useQuery<AnimeListStatus | null>({
		queryKey: ['anime-status', animeId],
		queryFn: async () => getUserAnimeStatus(userId, animeId),
	})
}
