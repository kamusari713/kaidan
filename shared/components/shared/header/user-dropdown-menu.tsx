'use client'

import { AlignJustify, Bell, List, MessageCircle, User } from 'lucide-react'
import Link from 'next/link'
import React from 'react'
import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Separator } from '../../ui'
import { ThemeToggle } from '../layout'

export const UserDropdownMenu: React.FC = () => {
	const [open, setOpen] = React.useState(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="group/user">
					<AlignJustify className="stroke-accent fill-accent group-hover/user:stroke-card group-hover/user:fill-card" size={20} strokeWidth={2} absoluteStrokeWidth />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className="bg-card flex flex-col">
				<Link href="/profile/1/titles">
					<Button variant="ghost" className="group flex justify-start" onClick={() => setOpen(false)}>
						<User className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" />
						Мой профиль
					</Button>
				</Link>

				<Separator />

				<Link href="/profile/1/titles">
					<Button variant="ghost" className="group flex justify-start" onClick={() => setOpen(false)}>
						<List className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" />
						Тайтлы
					</Button>
				</Link>
				<Link href="/profile/1/comments">
					<Button variant="ghost" className="group flex justify-start" onClick={() => setOpen(false)}>
						<MessageCircle className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" />
						Комментарии
					</Button>
				</Link>
				<Link href="/profile/1/notifications">
					<Button variant="ghost" className="group flex justify-start" onClick={() => setOpen(false)}>
						<Bell className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" absoluteStrokeWidth />
						Уведомления
					</Button>
				</Link>
				<ThemeToggle />
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
