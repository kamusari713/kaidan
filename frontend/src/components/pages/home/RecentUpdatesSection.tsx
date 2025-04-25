'use client'

import { Card, CardContent } from '@/components/ui'
import { useRecentUpdates } from '@/hooks/anime'
import { FC } from 'react'
import { RecentUpdatesTab } from './RecentUpdatesTab'

export const RecentUpdatesSection: FC = () => {
	const { animeData, isLoading, error } = useRecentUpdates()

	if (error) return <div>{error.message}</div>

	return (
		<div className="flex flex-col w-1/2 gap-2">
			<div className="ml-4">Последние обновления</div>
			<Card>
				<CardContent>
					<RecentUpdatesTab animeData={animeData} isLoading={isLoading} />
				</CardContent>
			</Card>
		</div>
	)
}
// <div className="bg-card rounded-md w-1/2 h-fit border shadow">
// <Tabs className="flex flex-col" defaultValue="tab1">
// 	<TabsList className="flex justify-between px-4 py-3">
// 		<div>Последние обновления</div>
// <TabsTrigger value="tab2" variant="section">
// 	Мои обновления
// </TabsTrigger>
// 		<div>
// 			<TabsTrigger value="tab1" variant="section">
// 				Все обновления
// 			</TabsTrigger>
// 		</div>
// 	</TabsList>
// 		<Separator />
// 	<TabsContent value="tab1">
// 	</TabsContent>
// 		<TabsContent value="tab2">
// 			<div className="flex items-center text-center p-4 my-[20px]">
// 				Данный список показывает тайтлы на основе ваших настроек уведомлений и то, что у вас находится в закладках. Подписывайтесь на уведомления озвучек , чтобы отобразить тайтлы
// 				здесь.
// 			</div>
// 			</TabsContent>
// 		</Tabs>
// </div>
