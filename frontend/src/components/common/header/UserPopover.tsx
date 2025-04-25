'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/components/ui'
import { AlignJustify, Compass, List, MessageCircle, User } from '@/components/ui/icons'
import { useLogout } from '@/hooks/authentication'
import Link from 'next/link'
import { FC, useState } from 'react'

interface PopoverProps {
	userId?: string
}

export const UserPopover: FC<PopoverProps> = ({ userId }) => {
	const [open, setOpen] = useState(false)
	const logout = useLogout()

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-[14px]">
					<AlignJustify size={20} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="bg-card flex flex-col w-[200px] p-1.5 gap-1.5 text-[14px]">
				<Link href={`/profile/${userId}/titles`}>
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<User />
						Мой профиль
					</Button>
				</Link>

				<Separator />

				<Link href={`/profile/${userId}/titles`}>
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<List />
						Тайтлы
					</Button>
				</Link>
				<Link href={`/profile/${userId}/comments`}>
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<MessageCircle />
						Комментарии
					</Button>
				</Link>
				<Link href={`/profile/${userId}/reviews`}>
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<Compass />
						Отзывы
					</Button>
				</Link>
				<Button variant="destructive" className="flex justify-center w-full" onClick={() => logout.mutate()}>
					Выйти
				</Button>
			</PopoverContent>
		</Popover>
	)
}
