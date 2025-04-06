export type AnimeListStatus = 'WATCHING' | 'PLANNED' | 'WATCHED' | 'DROPPED' | 'ON_HOLD'

export interface UserAnimeList {
	id: string
	userId: string
	animeId: string
	status: AnimeListStatus
	createdAt: string
	updatedAt: string
}
