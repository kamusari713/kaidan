'use client'

import { TitlesCardSection } from '@/components/pages/profile'
import { TitleSeparator } from '@/components/ui'
import { useAuthorize } from '@/hooks/authentication'
import { useUserAnimeList } from '@/hooks/profile'
import { UserAnimeList } from '@/types/animeList'
import { useParams } from 'next/navigation'
import { useMemo, useState } from 'react'

const tabs = ['Все', 'Смотрю', 'Запланировано', 'Брошено', 'Просмотрено', 'Отложено'] as const

type TabType = (typeof tabs)[number]

type CountsType = {
    [key in TabType]?: number
}

const statusMap = {
    Смотрю: 'WATCHING',
    Запланировано: 'PLANNED',
    Брошено: 'DROPPED',
    Просмотрено: 'WATCHED',
    Отложено: 'ON_HOLD',
} as const

const TitlesTab = () => {
    const [activeTab, setActiveTab] = useState<TabType>('Все')
    const [searchQuery, setSearchQuery] = useState('')
    const params = useParams()
    const userId = params?.userId as string
    const { isGuest } = useAuthorize()
    const { data: animeList, isLoading, error } = useUserAnimeList(userId)

    const filteredList = useMemo(() => {
        if (!animeList) return []

        return animeList.filter((item) => {
            const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())

            if (activeTab === 'Все') {
                return matchesSearch
            }

            const status = statusMap[activeTab as keyof typeof statusMap]
            return item.status === status && matchesSearch
        })
    }, [animeList, activeTab, searchQuery])

    const counts = useMemo<CountsType>(() => {
        if (!animeList) return {}

        const createFilter = (status?: string) => (item: UserAnimeList) => {
            const matchesStatus = status ? item.status === status : true
            return matchesStatus && item.title.toLowerCase().includes(searchQuery.toLowerCase())
        }

        return {
            Все: animeList.filter(createFilter()).length,
            Смотрю: animeList.filter(createFilter('WATCHING')).length,
            Запланировано: animeList.filter(createFilter('PLANNED')).length,
            Просмотрено: animeList.filter(createFilter('WATCHED')).length,
            Брошено: animeList.filter(createFilter('DROPPED')).length,
            Отложено: animeList.filter(createFilter('ON_HOLD')).length,
        }
    }, [animeList, searchQuery])

    if (isLoading) return <div>Загрузка...</div>
    if (error) return <div>Ошибка: {error.message}</div>

    return (
        <div className="flex gap-6 w-full">
            <div className="flex flex-col w-fit h-fit pb-2 text-[14px] bg-card rounded-md border shadow">
                <TitleSeparator>Списки</TitleSeparator>
                <div className="flex flex-col gap-2">
                    {tabs.map((tab, index) => (
                        <div
                            className="group/anime-list group-hover/anime-list:bg-primary/20 group-hover/anime-list:text-primary/60 rounded-md p-2 mx-2 data-[state=active]:bg-primary/20 data-[state=active]:text-primary/60 text-foreground/60 flex gap-6 justify-between items-center transition-all duration-200 hover:cursor-pointer"
                            data-state={activeTab === tab ? 'active' : 'not-active'}
                            onClick={() => setActiveTab(tab)}
                            key={index}
                        >
                            <p className="data-[state=active]:text-primary/60 text-foreground/60 group-hover/anime-list:text-primary/60 transition-all duration-200">{tab}</p>
                            <p
                                data-state={activeTab === tab ? 'active' : 'not-active'}
                                className="data-[state=active]:text-primary/60 text-foreground/60 group-hover/anime-list:text-primary/60 transition-all duration-200"
                            >
                                {counts[tab] ?? 0}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <TitlesCardSection list={filteredList} isGuest={isGuest} searchQuery={searchQuery} onSearchChange={setSearchQuery} />
        </div>
    )
}

export default TitlesTab
