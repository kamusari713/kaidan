import { Input } from '@/components/ui'
import { UserAnimeList } from '@/types/animeList'
import { FC } from 'react'
import { AnimeListCard } from './AnimeListCard'

interface TitlesCardSectionProps {
    list: UserAnimeList[]
    isGuest: boolean
    searchQuery: string
    onSearchChange: (value: string) => void
}

export const TitlesCardSection: FC<TitlesCardSectionProps> = ({ list, isGuest, searchQuery, onSearchChange }) => {
    return (
        <div className="flex flex-col flex-grow gap-6">
            <Input type="text" placeholder="Фильтр по названию" className="border p-2 rounded" value={searchQuery} onChange={(e) => onSearchChange(e.target.value)} />
            <div className="min-h-[140px] p-2 bg-card border shadow rounded-md">
                {list.length > 0 ? (
                    list.map((item, index) => <AnimeListCard key={index} item={item} isGuest={isGuest} />)
                ) : (
                    <div className="flex h-full items-center justify-center text-foreground/60">{searchQuery ? 'Ничего не найдено' : 'В этом списке пока нет тайтлов'}</div>
                )}
            </div>
        </div>
    )
}
