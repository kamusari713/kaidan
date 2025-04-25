'use client'

import { PageableContent, PaginationParams } from '@/types/pagination'
import { keepPreviousData, useQuery } from '@tanstack/react-query'
import { useState } from 'react'

export const usePagination = <T>(queryKey: string, fetchFunction: (params: PaginationParams) => Promise<PageableContent<T>>, initialPage = 0, size = 10) => {
	const [page, setPage] = useState(initialPage)

	const { data, isLoading, isError, error, isPlaceholderData } = useQuery({
		queryKey: ['pagination', queryKey, page, size],
		queryFn: () => fetchFunction({ page, size }),
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
		error,
		isPlaceholderData,
		page,
		totalPages: data?.totalPages || 0,
		handleNextPage,
		handlePrevPage,
	}
}
