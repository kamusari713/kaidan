'use client'

import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/components/ui'
import { useAuthorize } from '@/shared/hooks/auth'
import { FC } from 'react'

export const ProfileHeader: FC = () => {
	const { data, isGuest, isLoading } = useAuthorize()

	if (isLoading) {
		// TODO: сделать скелетон
		return <div>asd</div>
	}

	return (
		<div className="flex items-center justify-between px-4 py-3">
			<div className="flex gap-4">
				<div className="relative">
					<div className="absolute z-10 bg-green-600 rounded-full w-[12px] h-[12px] right-[-5px] top-[-5px]"></div>
					<Avatar className="w-16 h-16">
						<AvatarImage src="" alt="avatar"></AvatarImage>
						<AvatarFallback>{data!.username}</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col justify-center">
					<div className="font-bold">{data!.username}</div>
					<div className="text-foreground/60 text-[13px]">Уровень - 1</div>
				</div>
			</div>
			<div>
				<Button variant="outline">Настройки</Button>
			</div>
		</div>
	)
}
