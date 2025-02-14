'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { AxiosError } from 'axios'
import { FC, PropsWithChildren } from 'react'

function makeQueryClient() {
	return new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1 * 60 * 1000,
				gcTime: 24 * 60 * 60 * 1000,
				retry: (failureCount, error) => {
					const axiosError = error as AxiosError
					if (axiosError.response?.status === 401) return false
					if (failureCount > 3) return false
					return true
				},
			},
		},
	})
}

let browserQueryClient: QueryClient | undefined

function getQueryClient() {
	if (typeof window === 'undefined') {
		return makeQueryClient()
	}
	if (!browserQueryClient) browserQueryClient = makeQueryClient()
	return browserQueryClient
}

export const TanstackQueryProvider: FC<PropsWithChildren> = ({ children }) => {
	const queryClient = getQueryClient()

	return (
		<QueryClientProvider client={queryClient}>
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
		</QueryClientProvider>
	)
}
