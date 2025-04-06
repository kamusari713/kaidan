'use client'

import { useState } from 'react'
import { useAnimeListStatus, useAddToList, useRemoveFromList } from '@/shared/hooks/anime-list'
import { useQueryClient } from '@tanstack/react-query'
import { Button, Layers, Plus, Popover, PopoverContent, PopoverTrigger, Trash } from '@/shared/components/ui'
import { animeListStatusLabels } from '@/shared/constants'
import { AnimeListStatus } from '@/shared/types/anime'

type Props = {
	animeId: string
}

export function AnimeListPopoverMenu({ animeId }: Props) {
	const [open, setOpen] = useState(false)
	const queryClient = useQueryClient()
	const user = queryClient.getQueryData<{ id: string }>(['auth'])

	const { data: status } = useAnimeListStatus(animeId)
	const addMutation = useAddToList(animeId)
	const removeMutation = useRemoveFromList(animeId)

	const isLoading = addMutation.isPending || removeMutation.isPending
	const isDisabled = !user || isLoading

	const handleAdd = (s: string) => {
		addMutation.mutate(s as any)
		setOpen(false)
	}

	const handleRemove = () => {
		removeMutation.mutate()
		setOpen(false)
	}

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-sm gap-2" disabled={isDisabled}>
					<Layers className="h-4 w-4" />
					{user ? (status ? `В списке: ${status}` : 'Добавить в список') : 'Войдите для списка'}
				</Button>
			</PopoverTrigger>

			{user && (
				<PopoverContent className="w-60">
					{status ? (
						<Button onClick={handleRemove} variant="destructive" className="w-full justify-start gap-2">
							<Trash className="h-4 w-4" />
							Удалить из списка
						</Button>
					) : (
						<>
							{Object.entries(animeListStatusLabels).map(([status, label]) => (
								<Button key={status} onClick={() => handleAdd(status as AnimeListStatus)} variant="ghost" className="w-full justify-start text-left text-m">
									<Plus className="mr-2 h-4 w-4" />
									{`Добавить: ${label}`}
								</Button>
							))}
						</>
					)}
				</PopoverContent>
			)}
		</Popover>
	)
}
