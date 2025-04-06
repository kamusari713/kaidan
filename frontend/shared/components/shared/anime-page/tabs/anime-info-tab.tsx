import { AnimeInfo } from '@/shared/types/anime-page/props'
import { FC } from 'react'

interface AnimeInfoTabProps {
	data: AnimeInfo
}

export const AnimeInfoTab: FC<AnimeInfoTabProps> = ({ data }) => {
	return (
		<div className="flex flex-col max-w-[1000px]">
			<div>{data.title.RU}</div>
			<div>{data.description.RU}</div>
			<div>
				<p>Теги</p>
				<div className="flex flex-wrap gap-2">
					{data.tags.map((tag, index) => (
						<p key={index}>{tag.RU?.name}</p>
					))}
				</div>
			</div>
			<div>
				<div>На других сайтах</div>
				<div className="flex flex-wrap gap-2">
					{data.externalLinks.map((link, index) => (
						<a href={link.url} target="__blank" key={index}>
							{link.source}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
