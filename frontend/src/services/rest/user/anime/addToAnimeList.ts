import { fetchApi } from '@/services/rest/fetchApi'
import { AnimeListStatus, UserAnimeList } from '@/types/animeList'

export const addToAnimeList = async (userId: string, animeId: string, status: AnimeListStatus): Promise<UserAnimeList> => {
	return fetchApi<UserAnimeList>({
		method: 'POST',
		url: `/private/user/${userId}/anime-lists/${animeId}`,
		data: { status },
	})
}
