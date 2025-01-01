import { CatalogDropdownMenu, NotificationPopover, UserDropdownMenu } from '@/shared/components/shared/header'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui'
import { MessagesSquare, Search } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Container } from './container'

export const Header: React.FC = () => {
	return (
		<Container className="flex flex-row items-center justify-between bg-card px-10 rounded-xl rounded-t-none border border-t-0 shadow">
			<Link href="/">
				<div className="text-[50px] tracking-[12px]">KAIDAN</div>
			</Link>
			<div className="flex flex-row gap-6 items-center justify-center">
				<CatalogDropdownMenu />
				<div className="group flex flex-row items-center gap-4 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer rounded-xl p-2">
					<Search className="stroke-accent group-hover:stroke-card" size={20} absoluteStrokeWidth />
					Поиск
				</div>
				<Link href="/forum" className="group flex flex-row items-center gap-4 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer rounded-xl p-2">
					<MessagesSquare className="stroke-accent group-hover:stroke-card" size={20} absoluteStrokeWidth />
					Форум
				</Link>
			</div>
			<div className="group flex flex-row items-center justify-center gap-2">
				<NotificationPopover />
				<Link href="/profile/1/titles">
					<Avatar className="bg-card">
						<AvatarImage src="/images/avatar.png" alt="avatar"></AvatarImage>
						<AvatarFallback>User</AvatarFallback>
					</Avatar>
				</Link>
				<UserDropdownMenu />
			</div>
		</Container>
	)
}
