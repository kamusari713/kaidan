'use client'

import { GET_ANIME_INFO } from '@/shared/api/graphql'
import { Container } from '@/shared/components'
import { KodikVideo } from '@/shared/components/shared/anime-page'
import { AnimeListPopoverMenu } from '@/shared/components/shared/anime-page'
import { AnimeInfoTab, AnimeCommentsTab, AnimeReviewTab } from '@/shared/components/shared/anime-page/tabs'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui'
import { AnimeInfo } from '@/shared/types/anime-page/props'
import { UserCredentials } from '@/shared/types/auth'
import { useQuery } from '@apollo/client'
import { useQueryClient } from '@tanstack/react-query'

interface PageProps {
	params: {
		animeId: string
	}
}

export default function Page({ params }: PageProps) {
	const animeId = params.animeId

	const { loading, error, data } = useQuery(GET_ANIME_INFO, {
		variables: { shikimoriId: animeId },
	})

	const queryClient = useQueryClient()
	const user = queryClient.getQueryData<UserCredentials>(['auth'])

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>
	const animeData: AnimeInfo = data?.anime

	return (
		<Container className="flex flex-col flex-grow gap-10 mb-10">
			<img src={animeData.coverImage.banner} alt="banner image" />
			<div className="flex flex-row">
				<div className="">
					<img className="w-[260px] h-[364px]" src={animeData.coverImage.extraLarge} alt="anime image" />
					<div>
						<AnimeListPopoverMenu animeId={animeId} />
						<div>
							<div>Тип</div>
							<div>{animeData.kind}</div>
						</div>
						<div>
							<div>Статус</div>
							<div>{animeData.status.RU}</div>
						</div>
						<div>
							с {animeData.startDate} по {animeData.endDate}
						</div>
						<div>
							<div>Возрастной рейтинг</div>
							<div>{animeData.rating}</div>
						</div>
						<div>
							<div>Количество эпизодов</div>
							<div>
								{animeData.episodes} [{animeData.duration} мин.]
							</div>
						</div>
						<div>
							<div>Студии</div>
							<div>
								{animeData.studios.map((title, index) => (
									<p key={index}>{title}</p>
								))}
							</div>
						</div>
					</div>
				</div>
				<Tabs defaultValue="info">
					<TabsList>
						<TabsTrigger variant="section" value="info">
							Информация
						</TabsTrigger>
						<TabsTrigger variant="section" value="video">
							Смотреть
						</TabsTrigger>
						<TabsTrigger variant="section" value="comments">
							Комментарии
						</TabsTrigger>
						<TabsTrigger variant="section" value="review">
							Отзывы
						</TabsTrigger>
					</TabsList>
					<TabsContent value="info">
						<AnimeInfoTab data={animeData} />
					</TabsContent>
					<TabsContent value="comments">
						<AnimeCommentsTab animeId={animeId} />
					</TabsContent>
					<TabsContent value="review">
						<AnimeReviewTab userId={user?.id} animeId={animeId} />
					</TabsContent>
					<TabsContent value="video">
						<KodikVideo id={animeId} />
					</TabsContent>
				</Tabs>
			</div>
		</Container>
	)
}
