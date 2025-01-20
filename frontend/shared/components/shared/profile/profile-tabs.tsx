'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui'
import { usePathname, useRouter } from 'next/navigation'
import React from 'react'

export const ProfileTabs: React.FC = () => {
	const router = useRouter()
	const pathname = usePathname()

	const currentTab = pathname.split('/').pop() || 'titles'

	const handleTabChange = (tab: string) => {
		router.push(`/profile/1/${tab}`)
	}

	return (
		<Tabs value={currentTab || 'titles'} onValueChange={handleTabChange}>
			<TabsList className="px-4">
				<TabsTrigger variant="section" value="titles">
					Тайтлы
				</TabsTrigger>
				<TabsTrigger variant="section" value="comments">
					Комментарии
				</TabsTrigger>
				<TabsTrigger variant="section" value="ratings">
					Оценки
				</TabsTrigger>
				<TabsTrigger variant="section" value="watch-history">
					История просмотров
				</TabsTrigger>
				<TabsTrigger variant="section" value="notifications">
					Уведомления
				</TabsTrigger>
			</TabsList>
		</Tabs>
	)
}
