export interface AnimeInfo {
	id: string

	title: {
		EN: string
		RU: string
		ROMAJI: string
		NATIVE: string
	}

	synonyms: string[]

	description: {
		EN?: string
		RU?: string
	}

	shikimoriScore?: number
	shikimoriUrl?: string
	shikimoriId?: string
	watchRating?: string

	episodes?: number
	duration?: number

	externalLinks: {
		source: string
		url: string
	}[]

	kind?: string
	rating?: string

	status: {
		EN?: string
		RU?: string
	}

	startDate?: string
	endDate?: string

	coverImage: {
		extraLarge?: string
		large?: string
		medium?: string
		color?: string
		banner?: string
	}

	genres: {
		EN?: string
		RU?: string
	}[]

	studios: string[]

	tags: {
		RU?: {
			name: string
			description: string
		}
		EN?: {
			name: string
			description: string
		}
		rank?: number
		isSpoiler?: boolean
	}[]

	averageScore?: number
	scoreCount?: number
}
