import { getAnimeReviews } from '@/src/api/rest/anime'
import { Review } from '@/src/lib/types/review'
import { useQuery } from '@tanstack/react-query'

export const useAnimeReviews = (animeId: string) =>
	useQuery<Review[]>({
		queryKey: ['anime-reviews', animeId],
		queryFn: () => getAnimeReviews(animeId),
		enabled: !!animeId,
	})
