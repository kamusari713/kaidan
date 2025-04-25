import { getUserAnimeList } from '@/services/rest/user/anime'
import { UserAnimeList } from '@/types/animeList'
import { useQuery } from '@tanstack/react-query'

export const useUserAnimeList = (userId?: string) => {
	return useQuery<UserAnimeList[]>({
		queryKey: ['user-anime-list', userId],
		queryFn: () => getUserAnimeList(userId),
	})
}
