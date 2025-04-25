import { gql } from '@apollo/client'

export const GET_RECENT_UPDATES_DATA = gql`
	query GetUpdatesPage($sort: Sort, $perPage: Int) {
		page(sort: $sort, perPage: $perPage) {
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
