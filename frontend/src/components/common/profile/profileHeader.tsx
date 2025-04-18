'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/src/components/ui'
import { useAuthorize } from '@/src/hooks/authentication'
import { useProfile } from '@/src/hooks/profile'
import { BioEditor } from './bioEditor'

export const ProfileHeader = ({ userId }: { userId: string }) => {
	const { isLoading: credentialsIsLoading, isGuest } = useAuthorize()
	const { data: profileData, isLoading: profileIsLoading } = useProfile(userId)

	const isLoading = credentialsIsLoading || profileIsLoading

	if (isLoading) {
		// TODO: сделать скелетон
		return <div>asd</div>
	}

	return (
		<div className="flex items-center justify-between px-4 py-3">
			<div className="flex gap-4">
				<div className="relative">
					<Avatar className="w-24 h-24">
						<AvatarImage src="" alt="avatar"></AvatarImage>
						<AvatarFallback>{profileData!.username}</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col justify-start gap-2 pt-4">
					<div>Имя пользователя: </div>
					<div className="font-bold">{profileData!.username}</div>
				</div>
				{!isGuest ? (
					<BioEditor initialValue={profileData!.bio} userId={userId} />
				) : (
					<div className="flex flex-col justify-start gap-2 text-m pt-4">
						<div>Биография:</div>
						<div> {profileData!.bio}</div>
					</div>
				)}
			</div>
		</div>
	)
}
