import { Skeleton } from '@/components/ui'
import { AnimeInfo } from '@/types/anime'
import { FC } from 'react'

interface AnimeInfoTabProps {
	animeData?: AnimeInfo
	isLoading: boolean
}

export const AnimeInfoTab: FC<AnimeInfoTabProps> = ({ animeData, isLoading }) => {
	return (
		<div className="flex flex-col gap-3 px-2 pb-2 w-full">
			{!isLoading ? (
				<p>
					<strong className="h-4">Описание: </strong>
					<span>{animeData?.description.RU ? animeData?.description.RU : animeData?.description.EN}</span>
				</p>
			) : (
				<div>
					<Skeleton className="h-40" />
				</div>
			)}
			{!isLoading ? (
				<div className="flex flex-col gap-3">
					<strong className="h-4">Теги:</strong>
					<div className="flex flex-wrap gap-2">
						{animeData?.tags.slice(0, 5).map((tag, index) => (
							<span className="border bg-card p-1 rounded-md hover:cursor-pointer" key={index}>
								{tag.RU?.name}
							</span>
						))}
					</div>
				</div>
			) : (
				<div className="flex flex-col gap-2">
					<Skeleton className="h-4 w-20" />
					<Skeleton className="h-8" />
				</div>
			)}
			{animeData?.externalLinks.length ? (
				<div className="flex flex-col gap-2">
					<strong>На других сайтах:</strong>
					<div className="flex flex-wrap gap-2">
						{animeData?.externalLinks.map((link, index) => (
							<a className="underline" href={link.url} target="__blank" key={index}>
								{link.source}
							</a>
						))}
					</div>
				</div>
			) : null}
		</div>
	)
}
