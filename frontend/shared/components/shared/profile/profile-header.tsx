'use client'

import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'
import { useAuthorize } from '@/shared/hooks/auth'
import { BioEditor } from './bio-editor'
import { useProfile } from '@/shared/hooks/profile'

export const ProfileHeader = ({ userId }: { userId: string }) => {
	const { data: currentUser } = useAuthorize()
	const { data: profile, isLoading } = useProfile(userId)
	console.log(userId)

	const isOwner = currentUser?.id === userId

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
						<AvatarFallback>{profile!.username}</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col justify-start gap-2 pt-4">
					<div>Имя пользователя: </div>
					<div className="font-bold">{profile!.username}</div>
				</div>
				{isOwner ? (
					<BioEditor initialValue={profile!.bio} userId={userId} />
				) : (
					<div className="flex flex-col justify-start gap-2 text-m pt-4">
						<div>Биография:</div>
						<div> {profile!.bio}</div>
					</div>
				)}
			</div>
		</div>
	)
}
