import { getUserAnimeList } from '@/src/api/rest/user/animeList'
import { UserAnimeList } from '@/src/lib/types/animeList'
import { useQuery } from '@tanstack/react-query'

export const useUserAnimeList = (userId: string) => {
	return useQuery<UserAnimeList[]>({
		queryKey: ['user-anime-list', userId],
		queryFn: () => getUserAnimeList(userId),
	})
}
