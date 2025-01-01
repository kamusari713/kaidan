'use client'

import { Button, DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, Separator } from '@/shared/components/ui'
import { Layers } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const CatalogDropdownMenu: React.FC = () => {
	const [open, setOpen] = React.useState(false)

	return (
		<DropdownMenu open={open} onOpenChange={setOpen}>
			<DropdownMenuTrigger asChild>
				<Button variant="ghost" className="group text-[16px]">
					<Layers className="stroke-accent group-hover:stroke-card" size={20} absoluteStrokeWidth />
					Каталог
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent>
				<Link href="/catalog">
					<Button variant="ghost" className="w-full">
						Тайтлы
					</Button>
				</Link>
				<Separator />
				<Link href="/catalog?type=tv">
					<Button variant="ghost" className="w-full">
						TV-Сериал
					</Button>
				</Link>
				<Link href="/catalog?type=movie">
					<Button variant="ghost" className="w-full">
						Фильм
					</Button>
				</Link>
			</DropdownMenuContent>
		</DropdownMenu>
	)
}
