import { getUserProfile } from '@/services/rest/user/profile'
import { UserProfile } from '@/types/profile'
import { useQuery } from '@tanstack/react-query'

export const useProfile = (userId: string) => {
	const { data: profileData, isLoading } = useQuery<UserProfile>({
		queryKey: ['profile', userId],
		queryFn: () => getUserProfile(userId),
	})
	return { profileData, isLoading }
}
