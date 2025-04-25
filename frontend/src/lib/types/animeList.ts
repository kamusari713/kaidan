export type AnimeListStatus = 'WATCHING' | 'PLANNED' | 'WATCHED' | 'DROPPED' | 'ON_HOLD'

export interface UserAnimeList {
	userId: string
	animeId: string
	title: string
	status: AnimeListStatus
	createdAt: string
	updatedAt: string
	image: string
}

export type UserAnimeListShortDTO = {
	animeId: string
	title: string
	status: AnimeListStatus
	addedAt: string
	image: string
}
