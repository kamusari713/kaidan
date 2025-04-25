import { fetchApi } from '@/services/rest/fetchApi'

export const deleteFromAnimeList = async (userId: string, animeId: string): Promise<void> => {
	return fetchApi<void>({
		method: 'DELETE',
		url: `/private/user/${userId}/anime-lists/${animeId}`,
	})
}
