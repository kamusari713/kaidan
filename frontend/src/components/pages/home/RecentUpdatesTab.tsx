import { Separator, Skeleton } from '@/components/ui'
import { ANIME_RECENT_UPDATES_AMOUNT } from '@/lib/constants'
import { AnimeInfo } from '@/types/anime'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { FC } from 'react'

interface RecentUpdatesTabProps {
    animeData?: AnimeInfo[]
    isLoading: boolean
}

export const RecentUpdatesTab: FC<RecentUpdatesTabProps> = ({ animeData, isLoading }) => {
    const router = useRouter()

    return (
        <div>
            {isLoading
                ? Array.from({ length: ANIME_RECENT_UPDATES_AMOUNT }, (_, index) => (
                    <div key={`updates-skeleton-${index}`}>
                        <div className="group/item hover:bg-primary/20 flex gap-4 p-4">
                            <Skeleton className="w-[100px] h-[141px] rounded-md" />
                            <div className="flex flex-col justify-between w-full py-6">
                                <Skeleton className="h-4 w-1/2 rounded-md" />
                                <Skeleton className="h-4 w-1/2" />
                            </div>
                        </div>
                        {index < ANIME_RECENT_UPDATES_AMOUNT - 1 ? <Separator /> : null}
                    </div>
                ))
                : animeData?.map((anime, index) => (
                    <div key={anime.shikimoriId} onClick={() => router.push(`/anime/${anime.shikimoriId}`)}>
                        <div className="group/item hover:cursor-pointer hover:bg-primary/20 flex gap-4 p-4">
                            <Image width={100} height={150} src={anime.coverImage.extraLarge!} alt="Card image" className="rounded-md" />
                            <div className="flex flex-col justify-between w-full py-6">
                                <div className="h-4 text-[15px] group-hover/item:text-primary">{anime.title.RU}</div>
                                <div className="h-4 text-[13px] font-light">Эпизод {anime.episodes}</div>
                            </div>
                        </div>
                        {index < ANIME_RECENT_UPDATES_AMOUNT - 1 ? <Separator /> : null}
                    </div>
                ))}
        </div>
    )
}
