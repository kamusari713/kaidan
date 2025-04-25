import { fetchApi } from '@/services/rest/fetchApi'

export async function updateProfile(userId: string, username: string, bio: string): Promise<void> {
	return fetchApi<void>({
		method: 'POST',
		url: `/private/user/${userId}/profiles`,
		data: { newUsername: username, newBio: bio },
	})
}
