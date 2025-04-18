'use client'

import { Tabs, TabsList, TabsTrigger } from '@/src/components/ui'
import { usePathname, useRouter } from 'next/navigation'

export const ProfileTabs = ({ userId }: { userId: string }) => {
	const router = useRouter()
	const pathname = usePathname()

	const currentTab = pathname.split('/').pop() || 'titles'

	const handleTabChange = (tab: string) => {
		router.push(`/profile/${userId}/${tab}`)
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
			</TabsList>
		</Tabs>
	)
}
// <TabsTrigger variant="section" value="watch-history">
// 	История просмотров
// </TabsTrigger>
// <TabsTrigger variant="section" value="notifications">
// 	Уведомления
// </TabsTrigger>
