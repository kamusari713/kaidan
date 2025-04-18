import { AnimeListStatus } from './animeList'

export interface UserProfile {
	username: string
	bio: string
}

export type UserAnimeListShortDTO = {
	animeId: string
	title: string
	status: AnimeListStatus
	addedAt: string
	image: string
}
