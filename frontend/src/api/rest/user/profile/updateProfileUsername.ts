import { fetchApi } from '@/src/api/rest/fetchApi'
import { UserProfile } from '@/src/lib/types/profile'

export async function updateProfileUsername(userId: string, newUsername: string): Promise<UserProfile> {
	return fetchApi<UserProfile>({
		method: 'POST',
		url: `/private/user/${userId}/profiles/username`,
		data: newUsername,
	})
}
