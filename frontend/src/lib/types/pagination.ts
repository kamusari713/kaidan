import { AnimeInfo } from './anime'

export interface PageableContent<T> {
	content: T[]
	totalElements: number
	totalPages: number
	page: number
	size: number
}

export interface PaginationParams {
	page: number
	size: number
}

export interface AnimePageData {
	page: AnimePage
}

export interface AnimePage {
	pageInfo: PageInfo
	media: AnimeInfo[]
}

export interface PageInfo {
	totalPages: number
	currentPage: number
	hasNextPage: boolean
	lastPage: number
	perPage: number
}
