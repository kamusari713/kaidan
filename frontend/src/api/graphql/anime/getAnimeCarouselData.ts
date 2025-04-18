import { gql } from '@apollo/client'

export const GET_ANIME_CAROUSEL_DATA = gql`
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
