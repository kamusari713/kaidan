import { fetchApi } from '@/services/rest/fetchApi'
import { AnimeInfo } from '@/types/anime'

export const getUserAnimeUpdates = async (userId?: string, page = 0, size = 5): Promise<AnimeInfo[]> => {
	return fetchApi<AnimeInfo[]>({
		method: 'GET',
		url: `/private/anime/users/${userId}/updates?page=${page}&size=${size}`,
	})
}
