'use client'

import { CatalogPopover, NotificationPopover, UserPopover } from '@/shared/components/shared/header'
import { Container, ThemeToggle } from '@/shared/components/shared/layout'
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/shared/components/ui'
import { MessagesSquare, Search } from '@/shared/components/ui/icons'
import { useAuthorize } from '@/shared/hooks/auth'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export const Header: FC = () => {
	const router = useRouter()
	const { data, isGuest, isLoading } = useAuthorize()
	console.log(data)

	return (
		<div className="bg-card border-b shadow">
			<Container className="flex flex-row items-center justify-between">
				<Link href="/">
					<div className="text-[50px] tracking-[12px]">KAIDAN</div>
				</Link>
				<div className="flex flex-row gap-6 items-center justify-center">
					<CatalogPopover />
					<Button variant="ghost" className="text-[14px]">
						<Search />
						Поиск
					</Button>
					<Link href="/forum">
						<Button variant="ghost" className="text-[14px]">
							<MessagesSquare />
							Форум
						</Button>
					</Link>
				</div>

				<div className="flex flex-row items-center justify-center gap-2">
					<ThemeToggle />
					{!isLoading ? (
						isGuest ? (
							<Button onClick={() => router.push('/auth/login')}>Вход | Регистрация</Button>
						) : (
							<div className="flex flex-row items-center justify-center gap-2">
								<NotificationPopover />
								<Link href={`/profile/${data.id}/titles`}>
									<Avatar className="bg-card">
										<AvatarImage src="" alt="avatar"></AvatarImage>
										<AvatarFallback>{data.username[0].toUpperCase()}</AvatarFallback>
									</Avatar>
								</Link>

								<UserPopover />
							</div>
						)
					) : (
						<Button variant="destructive"></Button>
					)}
				</div>
			</Container>
		</div>
	)
}
