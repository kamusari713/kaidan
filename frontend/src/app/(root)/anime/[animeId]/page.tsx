'use client'

import { GET_ANIME_DATA } from '@/src/api/graphql/anime'
import { AnimeListPopoverMenu, KodikVideo } from '@/src/components/common/animePage'
import { AnimeCommentsTab, AnimeInfoTab, AnimeReviewTab } from '@/src/components/common/animePage/tabs'
import { Container } from '@/src/components/layout'
import { ShikimoriLogo, Star, Tabs, TabsContent, TabsList, TabsTrigger } from '@/src/components/ui'
import { AnimeInfo } from '@/src/lib/types/anime'
import { UserCredentials } from '@/src/lib/types/authentication'
import { useQuery } from '@apollo/client'
import { useQueryClient } from '@tanstack/react-query'
import Image from 'next/image'

interface PageProps {
	params: {
		animeId: string
	}
}

export default function Page({ params }: PageProps) {
	const animeId = params.animeId

	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	const {
		loading,
		error,
		data: animeData,
	} = useQuery(GET_ANIME_DATA, {
		variables: { shikimoriId: animeId },
	})
	const anime: AnimeInfo = animeData?.anime

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>

	return (
		<Container className="mx-auto px-4 sm:px-6 lg:px-8">
			<div className="grid grid-cols-[auto_1fr_auto] grid-rows-[300px_1fr] gap-4 relative">
				<div className="col-span-3 row-span-2 rounded-lg bg-cover bg-center relative z-10" style={{ gridArea: '1 / 1 / 3 / 4', backgroundImage: `url(${anime.coverImage.banner!})` }}>
					<div className="absolute inset-0 bg-black/50 rounded-lg"></div>
				</div>
				<div
					className="flex flex-col justify-end gap-2 mb-4 col-start-2 row-start-2 rounded-lg z-20"
					style={{
						gridArea: '2 / 2 / 3 / 3',
					}}
				>
					<h1 className="text-xl text-white font-bold">{anime.title.RU}</h1>
					<h1 className="text-xl text-white">{anime.title.ROMAJI}</h1>
				</div>
				<div
					className="flex flex-col gap-2 items-end justify-end m-4 col-start-3 row-start-2 rounded-lg z-20"
					style={{
						gridArea: '2 / 3 / 3 / 4',
					}}
				>
					<div className="flex gap-2">
						<Star />
						<strong className="text-white text-xl">{anime.averageScore ? anime.averageScore : '0.0'}</strong>
					</div>
					<a className="flex gap-2 p-2 border bg-card/20 rounded-xl hover:cursor-pointer" href={anime.shikimoriUrl} target="_blank">
						<ShikimoriLogo />
						<strong className="text-white text-xl">Шикимори: {anime.shikimoriScore}</strong>
					</a>
				</div>
				<div
					className="col-start-1 row-start-3 -mt-32 mx-4 w-fit relative z-10"
					style={{
						gridArea: '3 / 1 / 4 / 2',
					}}
				>
					<Image className="border rounded-lg z-50" src={anime.coverImage.extraLarge!} alt={anime.title.RU} width={280} height={400} />
					<div className="max-w-[280px] place-items-center mt-4">
						<AnimeListPopoverMenu className="w-full" animeId={animeId} />
						<div className="flex flex-col mt-4 p-4 bg-card border gap-4 rounded-xl">
							<div>
								<strong>Тип:</strong> {anime.kind}
							</div>
							<div>
								<strong>Статус:</strong> {anime.status.RU}
							</div>
							<div>
								<strong>Выпуск:</strong> {anime.startDate} - {anime.endDate}
							</div>
							<div>
								<strong>Эпизоды:</strong> {anime.episodes} ({anime.duration} мин.)
							</div>
							<div>
								<strong>Студии:</strong> {anime.studios.join(', ')}
							</div>
						</div>
					</div>
				</div>
				<div className="col-start-2 col-end-4 row-start-3 rounded-lg" style={{ gridArea: '3 / 2 / 4 / 4' }}>
					<Tabs className="flex flex-col items-start gap-4" defaultValue="info">
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
						<TabsContent className="w-full" value="info">
							<AnimeInfoTab data={anime} />
						</TabsContent>
						<TabsContent className="w-full" value="comments">
							<AnimeCommentsTab animeId={animeId} />
						</TabsContent>
						<TabsContent className="w-full" value="review">
							<AnimeReviewTab userId={userData?.id} animeId={animeId} />
						</TabsContent>
						<TabsContent className="w-full" value="video">
							<KodikVideo className="w-full aspect-video" id={animeId} />
						</TabsContent>
					</Tabs>
				</div>
			</div>
		</Container>
	)
}
