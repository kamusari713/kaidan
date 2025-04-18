import { fetchApi } from '@/src/api/rest/fetchApi'
import { UserProfile } from '@/src/lib/types/profile'

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
	return fetchApi<UserProfile>({
		method: 'GET',
		url: `/public/user/${userId}/profiles`,
	})
}
