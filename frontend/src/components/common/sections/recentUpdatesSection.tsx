'use client'

import { GET_RECENT_UPDATES_DATA } from '@/src/api/graphql/anime'
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui'
import { AnimeInfo } from '@/src/lib/types/anime'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export const RecentUpdatesSection: FC = () => {
	const router = useRouter()

	const { loading, error, data } = useQuery(GET_RECENT_UPDATES_DATA, {
		variables: {
			sort: { orderBy: 'endDate', direction: 'asc' },
		},
	})

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	const animeData: AnimeInfo[] = data?.page.media

	return (
		<div className="bg-card rounded-xl w-1/2 h-fit border shadow">
			<Tabs className="flex flex-col" defaultValue="tab1">
				<TabsList className="flex justify-between px-4 py-3">
					<div>Последние обновления</div>
					<div>
						<TabsTrigger value="tab1" variant="section">
							Все обновления
						</TabsTrigger>
						<TabsTrigger value="tab2" variant="section">
							Мои обновления
						</TabsTrigger>
					</div>
				</TabsList>
				<Separator />
				<TabsContent value="tab1">
					<div>
						{animeData.map((anime, index) => (
							<div key={anime.shikimoriId} onClick={() => router.push(`/anime/${anime.shikimoriId}`)}>
								<div className="group/item hover:cursor-pointer hover:bg-accent/20 flex gap-4 p-4">
									<Image width={100} height={150} src={anime.coverImage.extraLarge!} alt="Card image" />
									<div className="flex flex-col justify-between w-full py-6">
										<div className="text-[15px] group-hover/item:text-accent">{anime.title.RU}</div>
										<div className="text-[13px] font-light">Эпизод {anime.episodes}</div>
									</div>
								</div>
								{index < 5 - 1 ? <Separator /> : null}
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value="tab2">
					<div className="flex items-center text-center p-4 my-[20px]">
						Данный список показывает тайтлы на основе ваших настроек уведомлений и то, что у вас находится в закладках. Подписывайтесь на уведомления озвучек , чтобы отобразить тайтлы
						здесь.
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
