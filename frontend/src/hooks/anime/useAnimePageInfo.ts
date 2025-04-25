import { GET_ANIME_DATA } from '@/services/graphql/anime'
import { AnimeData } from '@/types/anime'
import { useQuery } from '@apollo/client'

export const useAnimePageInfo = (animeId: string) => {
	const {
		loading: isLoading,
		error,
		data,
	} = useQuery<AnimeData>(GET_ANIME_DATA, {
		variables: {
			shikimoriId: animeId,
		},
	})
	const animeData = data?.anime
	return { animeData, isLoading, error }
}
