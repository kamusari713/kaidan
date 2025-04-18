import { AnimeInfo } from '@/src/lib/types/anime'
import { FC } from 'react'

interface AnimeInfoTabProps {
	data: AnimeInfo
}

export const AnimeInfoTab: FC<AnimeInfoTabProps> = ({ data }) => {
	return (
		<div className="flex flex-col gap-2 w-full">
			<div> <strong>Описание:</strong> {data.description.RU ? data.description.RU : data.description.EN}</div>
			<div>
				<strong>Теги:</strong>
				<div className="flex flex-wrap gap-2">
					{data.tags.map((tag, index) => (
						<p className="border bg-card p-1 rounded-xl hover:cursor-pointer" key={index}>{tag.RU?.name}</p>
					))}
				</div>
			</div>
			<div>
				<strong>На других сайтах:</strong>
				<div className="flex flex-wrap gap-2">
					{data.externalLinks.map((link, index) => (
						<a className="underline" href={link.url} target="__blank" key={index}>
							{link.source}
						</a>
					))}
				</div>
			</div>
		</div>
	)
}
