'use client'

import { Container } from '@/components/layout'
import { AnimeCommentsTab, AnimeInfoCard, AnimeInfoTab, AnimeReviewTab, AnimeVideoTab } from '@/components/pages/anime'
import { Card, CardContent, Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui'
import { useAnimePageInfo } from '@/hooks/anime'
import { useAuthorize } from '@/hooks/authentication'

interface PageProps {
	params: {
		animeId: string
	}
}

const AnimePage = ({ params }: PageProps) => {
	const animeId = params.animeId
	const { userData } = useAuthorize()
	const { animeData, isLoading, error } = useAnimePageInfo(animeId)

	if (error) return <p>Error : {error.message}</p>

	return (
		<Container>
			<div className="grid grid-cols-[auto_1fr_auto] grid-rows-[2fr_1fr] gap-4 relative">
				<AnimeInfoCard userId={userData?.id} anime={animeData} animeId={animeId} isLoading={isLoading} />
				<Card className="col-start-2 col-end-4 row-start-3 h-fit" style={{ gridArea: '3 / 2 / 4 / 4' }}>
					<CardContent className="p-2">
						<Tabs className="flex flex-col items-start gap-2" defaultValue="info">
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
								<AnimeInfoTab animeData={animeData} isLoading={isLoading} />
							</TabsContent>
							<TabsContent className="w-full" value="comments">
								<AnimeCommentsTab animeId={animeId} />
							</TabsContent>
							<TabsContent className="w-full" value="review">
								<AnimeReviewTab userId={userData?.id} animeId={animeId} />
							</TabsContent>
							<TabsContent className="w-full" value="video">
								<AnimeVideoTab className="w-full h-full rounded-md" animeId={animeId} />
							</TabsContent>
						</Tabs>
					</CardContent>
				</Card>
			</div>
		</Container>
	)
}

export default AnimePage
