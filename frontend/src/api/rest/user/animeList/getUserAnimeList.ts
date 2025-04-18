import { fetchApi } from '@/src/api/rest/fetchApi'
import { UserAnimeList } from '@/src/lib/types/animeList'

export const getUserAnimeList = async (userId: string): Promise<UserAnimeList[]> => {
	return fetchApi<UserAnimeList[]>({
		method: 'GET',
		url: `/public/user/${userId}/profiles/anime-lists`,
	})
}
