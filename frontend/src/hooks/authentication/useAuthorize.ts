import { getUserCredentials } from '@/src/api/rest/user'
import { UserCredentials } from '@/src/lib/types/authentication'
import { useQuery } from '@tanstack/react-query'

export const useAuthorize = () => {
	const { data, isLoading } = useQuery<UserCredentials, boolean>({
		queryKey: ['auth'],
		queryFn: () => getUserCredentials(),
		staleTime: 5 * 60 * 1000,
	})
	const isGuest = !data
	return { data, isGuest, isLoading }
}
