import { AnimeListStatus } from '@/types/animeList'
import { ReviewStatus } from './types/review'

export const MIN_PASSWORD_FIELD_CHARACTERS = 4

export const ANIME_RECENT_UPDATES_AMOUNT = 5

export const AnimeListStatusLabels: Record<AnimeListStatus, string> = {
	WATCHING: 'Смотрю',
	WATCHED: 'Просмотрено',
	PLANNED: 'Планирую',
	DROPPED: 'Брошено',
	ON_HOLD: 'Отложено',
}

export const ReviewStatusLabels: Record<ReviewStatus, string> = {
	POSITIVE: 'Положительный',
	NEUTRAL: 'Нейтральный',
	NEGATIVE: 'Отрицательный',
}
