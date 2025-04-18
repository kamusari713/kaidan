import { getUserProfile } from '@/src/api/rest/user/profile'
import { UserProfile } from '@/src/lib/types/profile'
import { useQuery } from '@tanstack/react-query'

export const useProfile = (userId: string) => {
	const { data, isLoading } = useQuery<UserProfile>({
		queryKey: ['profile', userId],
		queryFn: () => getUserProfile(userId),
	})
	return { data, isLoading }
}
