import { getKodikData } from '@/services/rest/anime/kodik'
import { useQuery } from '@tanstack/react-query'

export const useKodikVideo = (animeId: string) => {
	const {
		data: videoData,
		isPending,
		error,
	} = useQuery({
		queryKey: ['anime', 'kodik', animeId],
		queryFn: async () => getKodikData(animeId),
	})

	return { videoData, isPending, error }
}
