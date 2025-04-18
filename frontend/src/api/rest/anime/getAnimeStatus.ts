import { fetchApi } from '@/src/api/rest/fetchApi'
import { AnimeListStatus } from '@/src/lib/types/animeList'

export const getUserAnimeStatus = async (userId: string, animeId: string): Promise<AnimeListStatus | null> => {
	const response = await fetchApi<AnimeListStatus>({
		method: 'GET',
		url: `/private/anime/${animeId}/user/${userId}/statuses`,
	})
	if (!response) return null
	return response
}
