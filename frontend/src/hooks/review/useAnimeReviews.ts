import { getAnimeReviews } from '@/services/rest/anime'
import { Review } from '@/types/review'
import { useQuery } from '@tanstack/react-query'

export const useAnimeReviews = (animeId: string) => {
	const {
		data: reviewsData,
		isLoading,
		isError,
		error,
	} = useQuery<Review[]>({
		queryKey: ['anime-reviews', animeId],
		queryFn: () => getAnimeReviews(animeId),
		enabled: !!animeId,
	})
	return { reviewsData, isLoading, isError, error }
}
