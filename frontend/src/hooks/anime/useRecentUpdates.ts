import { ANIME_RECENT_UPDATES_AMOUNT } from '@/lib/constants'
import { GET_RECENT_UPDATES_DATA } from '@/services/graphql/anime'
import { AnimePageData } from '@/types/pagination'
import { useQuery } from '@apollo/client'

export const useRecentUpdates = () => {
	const {
		loading: isLoading,
		error,
		data,
	} = useQuery<AnimePageData>(GET_RECENT_UPDATES_DATA, {
		variables: {
			sort: { orderBy: 'endDate', direction: 'asc' },
			perPage: ANIME_RECENT_UPDATES_AMOUNT,
		},
	})
	const animeData = data?.page.media

	return { animeData, isLoading, error }
}
