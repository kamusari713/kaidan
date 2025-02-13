'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/shared/components/ui'
import { AlignJustify, Bell, List, MessageCircle, User } from '@/shared/components/ui/icons'
import Link from 'next/link'
import { FC, useState } from 'react'

export const UserPopover: FC = () => {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-[14px]">
					<AlignJustify size={20} />
				</Button>
			</PopoverTrigger>
			<PopoverContent className="bg-card flex flex-col w-[200px] p-1.5 gap-1.5 text-[14px]">
				<Link href="/profile/1/titles">
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<User />
						Мой профиль
					</Button>
				</Link>

				<Separator />

				<Link href="/profile/1/titles">
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<List />
						Тайтлы
					</Button>
				</Link>
				<Link href="/profile/1/comments">
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<MessageCircle />
						Комментарии
					</Button>
				</Link>
				<Link href="/profile/1/notifications">
					<Button variant="ghost" className="flex justify-start w-full group/item" onClick={() => setOpen(false)}>
						<Bell />
						Уведомления
					</Button>
				</Link>
			</PopoverContent>
		</Popover>
	)
}
