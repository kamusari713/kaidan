export interface UserProfile {
	username: string
	bio: string
	banned: boolean
}

export type UserPublicProfile = Omit<UserProfile, 'banned'>
