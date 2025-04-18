import { fetchApi } from '@/src/api/rest/fetchApi'
import { UserProfile } from '@/src/lib/types/profile'

export async function updateProfileBio(userId: string, newBio: string): Promise<UserProfile> {
	return fetchApi<UserProfile>({
		method: 'POST',
		url: `/private/user/${userId}/profiles/bio`,
		data: newBio,
	})
}
