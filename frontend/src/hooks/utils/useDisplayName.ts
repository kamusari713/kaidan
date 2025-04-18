import { animeListStatusLabels } from '@/src/lib/constants'
import { AnimeListStatus } from '@/src/lib/types/animeList'

export const useDisplayName = (status?: AnimeListStatus | null): string | null => {
	if (!status) return null
	return animeListStatusLabels[status] || null
}
