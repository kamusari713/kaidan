'use client'

import { ThemeToggle, UserPopover } from '@/components/common/header'
import { Container } from '@/components/layout'
import { Avatar, AvatarFallback, AvatarImage, Button, Popover, PopoverContent, PopoverTrigger } from '@/components/ui'
import { Layers, Settings, ShikimoriLogo, User } from '@/components/ui/icons'
import { useAuthorize } from '@/hooks/authentication'
import Link from 'next/link'
import { FC, useState } from 'react'

export const Header: FC = () => {
	const { userData, isGuest, isAdmin, isLoading } = useAuthorize()
	const [open, setOpen] = useState(false)

	return (
		<div className="bg-card border-b shadow">
			<Container className="flex flex-row items-center justify-between">
				<Link href="/">
					<div className="text-[50px] tracking-[12px]">KAIDAN</div>
				</Link>
				<div className="flex flex-row gap-6 items-center justify-center">
					<Link href="/catalog">
						<Button variant="ghost" className="group text-[14px]">
							<Layers />
							Каталог
						</Button>
					</Link>
					{isAdmin ? (
						<Popover open={open} onOpenChange={setOpen}>
							<PopoverTrigger asChild>
								<Button variant="ghost" className="flex justify-start w-full group/item">
									<Settings />
									Админ-панель
								</Button>
							</PopoverTrigger>
							<PopoverContent className="bg-card flex flex-col w-[200px] p-1.5 gap-1.5 text-[14px]">
								<Link href="/admin/users">
									<Button onClick={() => setOpen(false)} variant="ghost" className="flex justify-start w-full group/item">
										<User />
										Пользователи
									</Button>
								</Link>
								<Link href="/admin/anime">
									<Button onClick={() => setOpen(false)} variant="ghost" className="flex justify-start w-full group/item">
										<ShikimoriLogo className="fill-foreground stroke-foreground" />
										Аниме
									</Button>
								</Link>
							</PopoverContent>
						</Popover>
					) : null}
				</div>

				<div className="flex flex-row items-center justify-center gap-2">
					<ThemeToggle />
					{!isLoading ? (
						isGuest ? (
							<Link href="/auth/login">
								<Button>Вход | Регистрация</Button>
							</Link>
						) : (
							<div className="flex flex-row items-center justify-center gap-2">
								<Link href={`/profile/${userData!.id}/titles`}>
									<Avatar className="bg-card">
										<AvatarImage src="" alt="avatar"></AvatarImage>
										<AvatarFallback>{userData!.username[0].toUpperCase()}</AvatarFallback>
									</Avatar>
								</Link>

								<UserPopover userId={userData?.id} />
							</div>
						)
					) : (
						<Button disabled>Вход | Регистрация</Button>
					)}
				</div>
			</Container>
		</div>
	)
}
// <Link href="/forum">
// 	<Button variant="ghost" className="text-[14px]">
// 		<MessagesSquare />
// 		Форум
// 	</Button>
// </Link>
