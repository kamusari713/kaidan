'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/shared/components/ui'
import { Layers } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

export const CatalogPopover: React.FC = () => {
	const [open, setOpen] = React.useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-[14px]">
					<Layers className="stroke-foreground group-hover:stroke-accent/60" size={20} absoluteStrokeWidth />
					Каталог
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<Link href="/catalog">
					<Button variant="ghost" className="text-[14px] w-full">
						Тайтлы
					</Button>
				</Link>
				<Separator />
				<Link href="/catalog?type=tv">
					<Button variant="ghost" className="text-[14px] w-full">
						TV-Сериал
					</Button>
				</Link>
				<Link href="/catalog?type=movie">
					<Button variant="ghost" className="text-[14px] w-full">
						Фильм
					</Button>
				</Link>
			</PopoverContent>
		</Popover>
	)
}
