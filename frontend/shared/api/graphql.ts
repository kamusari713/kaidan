import { gql } from '@apollo/client'

export const GET_HOME_SECTION_PAGE = gql`
	query GetHomeSectionPage {
		page {
			media {
				coverImage {
					extraLarge
				}
				title {
					RU
				}
				shikimoriId
				kind
			}
		}
	}
`

export const GET_UPDATES_PAGE = gql`
	query GetUpdatesPage($sort: Sort) {
		page(sort: $sort) {
			media {
				title {
					RU
				}
				episodes
				coverImage {
					extraLarge
				}
				shikimoriId
			}
		}
	}
`

export const GET_ANIME_INFO = gql`
	query GetAnimeInfo($shikimoriId: String!) {
		anime(shikimoriId: $shikimoriId) {
			id
			title {
				EN
				RU
				ROMAJI
				NATIVE
			}
			synonyms
			description {
				EN
				RU
			}
			shikimoriScore
			shikimoriUrl
			shikimoriId
			watchRating
			episodes
			duration
			externalLinks {
				source
				url
			}
			kind
			rating
			status {
				EN
				RU
			}
			startDate
			endDate
			coverImage {
				extraLarge
				large
				medium
				color
				banner
			}
			genres {
				EN
				RU
			}
			studios
			tags {
				RU {
					name
					description
				}
				EN {
					name
					description
				}
				rank
				isSpoiler
			}
			averageScore
			scoreCount
		}
	}
`
