import { fetchApi } from '@/services/rest/fetchApi'
import { UserAnimeList } from '@/types/animeList'

export const getUserAnimeList = async (userId?: string): Promise<UserAnimeList[]> => {
	return fetchApi<UserAnimeList[]>({
		method: 'GET',
		url: `/public/user/${userId}/profiles/anime-lists`,
	})
}
