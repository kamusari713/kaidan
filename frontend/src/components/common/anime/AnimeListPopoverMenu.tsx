'use client'

import { Button, Layers, Plus, Popover, PopoverContent, PopoverTrigger, Trash } from '@/components/ui'
import { useAddToList, useDeleteFromAnimeList, useUserAnimeStatus } from '@/hooks/animeList'
import { useDisplayName } from '@/hooks/utils'
import { AnimeListStatusLabels } from '@/lib/constants'
import { AnimeListStatus } from '@/types/animeList'
import { useState } from 'react'

type Props = {
    userId?: string
    animeId: string
    className?: string
}

export function AnimeListPopoverMenu({ userId, animeId, className }: Props) {
    const [open, setOpen] = useState(false)

    const { animeStatus } = useUserAnimeStatus(userId ?? '', animeId)
    const status = useDisplayName<AnimeListStatus>({ status: animeStatus, labels: AnimeListStatusLabels })

    const { mutate: mutateAddToList, isPending: addIsPending } = useAddToList(userId ?? '', animeId)
    const { mutate: deleteMutation, isPending: deleteIsPending } = useDeleteFromAnimeList(userId ?? '', animeId)

    const isLoading = addIsPending || deleteIsPending
    const isDisabled = !userId || isLoading

    const handleAdd = (status: AnimeListStatus) => {
        mutateAddToList(status)
        setOpen(false)
    }

    const handleRemove = () => {
        deleteMutation()
        setOpen(false)
    }

    return (
        <div className={className}>
            <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="group w-full border bg-card text-sm gap-2" disabled={isDisabled}>
                        <Layers className="h-4 w-4" />
                        {userId ? (status ? `В списке: ${status}` : 'Добавить в список') : 'Войдите в аккаунт'}
                    </Button>
                </PopoverTrigger>

                {userId && (
                    <PopoverContent>
                        <div>
                            {Object.entries(AnimeListStatusLabels).map(([status, label]) => (
                                <Button key={status} onClick={() => handleAdd(status as AnimeListStatus)} variant="ghost" className="w-full justify-start text-left text-m">
                                    <Plus className="mr-2 h-4 w-4" />
                                    {`Добавить: ${label}`}
                                </Button>
                            ))}
                            {status ? (
                                <Button onClick={handleRemove} variant="destructive" className="w-full hover:text-foreground justify-start gap-2">
                                    <Trash className="h-4 w-4" />
                                    Удалить из списка
                                </Button>
                            ) : null}
                        </div>
                    </PopoverContent>
                )}
            </Popover>
        </div>
    )
}
