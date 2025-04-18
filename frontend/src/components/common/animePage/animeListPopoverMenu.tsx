'use client'

import { Button, Layers, Plus, Popover, PopoverContent, PopoverTrigger, Trash } from '@/src/components/ui'
import { useAddToList, useDeleteFromAnimeList, useUserAnimeStatus } from '@/src/hooks/animeList'
import { useDisplayName } from '@/src/hooks/utils'
import { animeListStatusLabels } from '@/src/lib/constants'
import { AnimeListStatus } from '@/src/lib/types/animeList'
import { UserCredentials } from '@/src/lib/types/authentication'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

type Props = {
	animeId: string
	className?: string
}

export function AnimeListPopoverMenu({ animeId, className }: Props) {
	const [open, setOpen] = useState(false)

	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	const { data: displayName } = useUserAnimeStatus(userData?.id ?? '', animeId)
	const status = useDisplayName(displayName)

	const { mutate: mutateAddToList, isPending: addIsPending } = useAddToList(userData?.id ?? '', animeId)
	const { mutate: deleteMutation, isPending: deleteIsPending } = useDeleteFromAnimeList(userData?.id ?? '', animeId)

	const isLoading = addIsPending || deleteIsPending
	const isDisabled = !userData || isLoading

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
						{userData ? (status ? `В списке: ${status}` : 'Добавить в список') : 'Войдите в аккаунт'}
					</Button>
				</PopoverTrigger>

				{userData && (
					<PopoverContent>
						{status ? (
							<Button onClick={handleRemove} variant="destructive" className="w-full hover:text-foreground justify-start gap-2">
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
		</div>
	)
}
