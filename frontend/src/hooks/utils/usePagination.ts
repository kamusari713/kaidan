import { fetchApi } from '@/src/api/rest/fetchApi'
import { PageableContent } from '@/src/lib/types/pagination'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useState } from 'react'

export const usePagination = <T>(endpoint: string, initialPage = 0, size = 10) => {
	const [page, setPage] = useState(initialPage)

	const { isLoading, isError, error, data, isFetching, isPlaceholderData } = useQuery({
		queryKey: ['pagination', endpoint, page, size],
		queryFn: () =>
			fetchApi<PageableContent<T>>({
				method: 'GET',
				url: `/${endpoint}?page=${page}&size=${size}`,
			}),
		placeholderData: keepPreviousData,
	})

	const handleNextPage = () => {
		if (data && page < data.totalPages - 1) {
			setPage((prev) => prev + 1)
		}
	}

	const handlePrevPage = () => {
		if (page > 0) {
			setPage((prev) => prev - 1)
		}
	}

	return {
		data,
		isLoading,
		isError,
		isFetching,
		isPlaceholderData,
		error,
		page,
		totalPages: data?.totalPages || 0,
		handleNextPage,
		handlePrevPage,
	}
}
