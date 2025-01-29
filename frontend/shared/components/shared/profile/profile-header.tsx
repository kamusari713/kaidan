import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/components/ui'
import { FC } from 'react'

export const ProfileHeader: FC = () => {
	return (
		<div className="flex items-center justify-between px-4 py-3">
			<div className="flex gap-4">
				<div className="relative">
					<div className="absolute z-10 bg-green-600 rounded-full w-[12px] h-[12px] right-[-5px] top-[-5px]"></div>
					<Avatar className="w-16 h-16">
						<AvatarImage src="/images/avatar.png"></AvatarImage>
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
				</div>
				<div className="flex flex-col justify-center">
					<div className="font-bold">User</div>
					<div className="text-foreground/60 text-[13px]">Уровень - 1</div>
				</div>
			</div>
			<div>
				<Button variant="outline">Настройки</Button>
			</div>
		</div>
	)
}
