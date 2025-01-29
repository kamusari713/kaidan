'use client'

import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/shared/components/ui'
import { Layers } from '@/shared/components/ui/icons'
import Link from 'next/link'
import { FC, useState } from 'react'

export const CatalogPopover: FC = () => {
	const [open, setOpen] = useState(false)

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-[14px]">
					<Layers />
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
