import { GET_ANIME_CAROUSEL_DATA } from '@/services/graphql/anime'
import { AnimePageData } from '@/types/pagination'
import { useQuery } from '@apollo/client'

export const useAnimeCarousel = () => {
	const {
		data,
		loading: isLoading,
		error,
		networkStatus,
		fetchMore,
		refetch,
	} = useQuery<AnimePageData>(GET_ANIME_CAROUSEL_DATA, {
		variables: {
			page: 1,
			perPage: 5,
			sort: { orderBy: 'shikimoriScore' },
		},
	})
	return { data, isLoading, error, networkStatus, fetchMore, refetch }
}
