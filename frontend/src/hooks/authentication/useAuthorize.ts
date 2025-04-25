import { refresh } from '@/services/rest/authentitacion'
import { getUserCredentials } from '@/services/rest/user'
import { UserCredentials } from '@/types/user'
import { useQuery } from '@tanstack/react-query'
import { AxiosError } from 'axios'

export const useAuthorize = () => {
	const { data: userData, isLoading } = useQuery<UserCredentials, boolean>({
		queryKey: ['auth'],
		queryFn: async () => {
			try {
				return await getUserCredentials()
			} catch (error) {
				if (error instanceof AxiosError) {
					if (error.status === 401) {
						try {
							await refresh()
							return await getUserCredentials()
						} catch (refreshError) {
							if (refreshError instanceof AxiosError) {
								throw new Error(`Failed to refresh token ${refreshError.message}`)
							}
						}
					}
					throw error
				}
				throw error
			}
		},
		staleTime: 5 * 60 * 1000,
		enabled: true,
		retry: false,
	})

	const isGuest = !userData
	const isAdmin = userData?.role === 'ROLE_ADMIN'

	return { userData, isGuest, isAdmin, isLoading }
}
