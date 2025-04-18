import { gql } from '@apollo/client'

export const GET_RECENT_UPDATES_DATA = gql`
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
