export interface PageableContent<T> {
	content: T[]
	totalElements: number
	totalPages: number
}

export interface PaginationParams {
	page: number
	size: number
}
