import { AnimeListStatus } from '@/src/lib/types/animeList'

export const MIN_PASSWORD_FIELD_CHARACTERS = 4

export const animeListStatusLabels: Record<AnimeListStatus, string> = {
	WATCHING: 'Смотрю',
	WATCHED: 'Просмотрено',
	PLANNED: 'Планирую',
	DROPPED: 'Брошено',
	ON_HOLD: 'Отложено',
}
