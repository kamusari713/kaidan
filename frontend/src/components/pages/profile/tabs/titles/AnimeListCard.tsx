import { AnimeListPopoverMenu } from '@/components/common/anime'
import { useTimeAgo } from '@/hooks/utils'
import { UserAnimeList } from '@/types/animeList'
import Link from 'next/link'
import { FC } from 'react'

interface AnimeListCardProps {
	item: UserAnimeList
	isGuest: boolean
}

export const AnimeListCard: FC<AnimeListCardProps> = ({ item, isGuest }) => {
	const date = useTimeAgo(item.updatedAt)
	return (
		<div className="flex p-4 items-center rounded-md group/list-item hover:cursor-pointer">
			<Link href={`/anime/${item.animeId}`} className="w-full flex gap-4">
				<div className="w-[62px] aspect-[10/14] rounded-md" style={{ backgroundImage: `url(${item.image})`, backgroundSize: 'cover' }}></div>
				<div className="flex flex-grow items-center justify-between">
					<div className="flex flex-col gap-4">
						<div className="text-[15px] group-hover/list-item:text-primary">{item.title}</div>
						<div>
							<div className="text-[13px] text-foreground/60 group-hover/list-item:text-primary/60">Обновлено</div>
							<div className="text-[13px] group-hover/list-item:text-primary/60">{date}</div>
						</div>
					</div>
				</div>
			</Link>
			{!isGuest ? <AnimeListPopoverMenu animeId={item.animeId} userId={item.userId} /> : null}
		</div>
	)
}
