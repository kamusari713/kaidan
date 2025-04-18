'use client'

import { CatalogPopover, NotificationPopover, ThemeToggle, UserPopover } from '@/src/components/common/header'
import { Container } from '@/src/components/layout'
import { Avatar, AvatarFallback, AvatarImage, Button } from '@/src/components/ui'
import { MessagesSquare, Search } from '@/src/components/ui/icons'
import { useAuthorize } from '@/src/hooks/authentication'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export const Header: FC = () => {
	const router = useRouter()
	const { data: userData, isGuest, isLoading } = useAuthorize()

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
								<Link href={`/profile/${userData!.id}/titles`}>
									<Avatar className="bg-card">
										<AvatarImage src="" alt="avatar"></AvatarImage>
										<AvatarFallback>{userData!.username[0].toUpperCase()}</AvatarFallback>
									</Avatar>
								</Link>

								<UserPopover />
							</div>
						)
					) : (
						<Button disabled onClick={() => router.push('/auth/login')}>
							Вход | Регистрация
						</Button>
					)}
				</div>
			</Container>
		</div>
	)
}
