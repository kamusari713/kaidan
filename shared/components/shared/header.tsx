import { Container, ThemeToggle } from '@/shared/components'
import { Avatar, AvatarFallback, AvatarImage } from '@/shared/components/ui/avatar'
import { Button } from '@/shared/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger } from '@/shared/components/ui/dropdown-menu'
import { Popover, PopoverContent, PopoverTrigger } from '@/shared/components/ui/popover'
import { Separator } from '@/shared/components/ui/separator'
import { AlignJustify, Bell, Layers, List, MessageCircle, MessagesSquare, Search, User } from 'lucide-react'
import React from 'react'

export const Header: React.FC = () => {
	return (
		<Container className="flex flex-row items-center justify-between bg-card px-10 py-4 rounded-xl border shadow">
			<div className="text-[50px] tracking-[12px]">KAIDAN</div>
			<div className="flex flex-row gap-6 items-center justify-center">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="group text-[16px]">
							<Layers className="stroke-accent group-hover:stroke-card" size={20} absoluteStrokeWidth />
							Каталог
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<Button variant="ghost" className="w-full">
							Тайтлы
						</Button>
						<Separator />
						<Button variant="ghost" className="w-full">
							TV-Сериал
						</Button>
						<Button variant="ghost" className="w-full">
							Фильм
						</Button>
					</DropdownMenuContent>
				</DropdownMenu>
				<div className="group flex flex-row items-center gap-4 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer rounded-xl p-2">
					<Search className="stroke-accent group-hover:stroke-card" size={20} absoluteStrokeWidth />
					Поиск
				</div>
				<div className="group flex flex-row items-center gap-4 hover:bg-accent hover:text-accent-foreground hover:cursor-pointer rounded-xl p-2">
					<MessagesSquare className="stroke-accent group-hover:stroke-card" size={20} absoluteStrokeWidth />
					Форум
				</div>
			</div>
			<div className="group flex flex-row items-center justify-center gap-6">
				<Popover>
					<PopoverTrigger asChild>
						<Button variant="ghost" className="group/bell">
							<Bell className="stroke-accent fill-accent group-hover/bell:stroke-card group-hover/bell:fill-card" size={20} absoluteStrokeWidth />
						</Button>
					</PopoverTrigger>
					<PopoverContent>
						<div className="p-2">Уведомления</div>
						<Separator />
						<div>asdasdasdasd</div>
					</PopoverContent>
				</Popover>
				<Avatar className="bg-card">
					<AvatarImage src="images/avatar.png" alt="avatar"></AvatarImage>
					<AvatarFallback>User</AvatarFallback>
				</Avatar>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant="ghost" className="group/user">
							<AlignJustify className="stroke-accent fill-accent group-hover/user:stroke-card group-hover/user:fill-card" size={20} strokeWidth={2} absoluteStrokeWidth />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent className="bg-card flex flex-col">
						<Button variant="ghost" className="group flex justify-start">
							<User className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" />
							Мой профиль
						</Button>
						<Separator />
						<Button variant="ghost" className="group flex justify-start">
							<Bell className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" absoluteStrokeWidth />
							Уведомления
						</Button>
						<Button variant="ghost" className="group flex justify-start">
							<MessageCircle className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" />
							Комментарии
						</Button>
						<Button variant="ghost" className="group flex justify-start">
							<List className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card" />
							Тайтлы
						</Button>
						<ThemeToggle />
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</Container>
	)
}
