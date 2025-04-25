import { gql } from '@apollo/client'

export const GET_ANIME_CAROUSEL_DATA = gql`
	query GetAnimePage($page: Int, $perPage: Int, $sort: Sort) {
		page(page: $page, perPage: $perPage, sort: $sort) {
			pageInfo {
				totalPages
				currentPage
				hasNextPage
				lastPage
				perPage
			}
			media {
				shikimoriId
				title {
					RU
				}
				coverImage {
					extraLarge
				}
				kind
			}
		}
	}
`
