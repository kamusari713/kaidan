import { fetchApi } from '@/services/rest/fetchApi'
import { UserProfile } from '@/types/profile'

export const getUserProfile = async (userId: string): Promise<UserProfile> => {
	return fetchApi<UserProfile>({
		method: 'GET',
		url: `/public/user/${userId}/profiles`,
	})
}
