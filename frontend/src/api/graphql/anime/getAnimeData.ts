import { gql } from '@apollo/client'

export const GET_ANIME_DATA = gql`
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
