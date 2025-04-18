'use client'

import { GET_ANIME_CAROUSEL_DATA } from '@/src/api/graphql/anime'
import { AnimeInfo } from '@/src/lib/types/anime'
import { useQuery } from '@apollo/client'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

export const AnimeCarouselSection: FC = () => {
	const router = useRouter()

	const { loading, error, data } = useQuery(GET_ANIME_CAROUSEL_DATA)

	if (loading) return <p>Loading...</p>
	if (error) return <p>Error: {error.message}</p>
	const animeData: AnimeInfo[] = data?.page.media

	return (
		<div className="flex gap-4 p-4 bg-card rounded-xl overflow-x-auto border shadow">
			{animeData.map((anime) => (
				<div
					onClick={() => {
						router.push(`/anime/${anime.shikimoriId}`)
					}}
					key={anime.shikimoriId}
					className="group/item hover:cursor-pointer p-2"
				>
					<div className="w-[200px] h-[300px]">
						<Image width={200} height={300} className="object-cover rounded-xl" src={anime.coverImage.extraLarge!} alt="Card image" />
					</div>
					<div className="group-hover/item:text-accent font-bold line-clamp-1">{anime.title.RU}</div>
					<div className="text-foreground/60">{anime.kind}</div>
				</div>
			))}
		</div>
	)
}
