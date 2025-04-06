import { addToList, getAnimeStatus, removeFromList } from '@/shared/api/actions'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { AnimeListStatus } from '@/shared/types/anime'

export function useAnimeListStatus(animeId: string) {
	return useQuery({
		queryKey: ['anime-status', animeId],
		queryFn: () => getAnimeStatus(animeId),
	})
}

export function useAddToList(animeId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (status: AnimeListStatus) => addToList(animeId, status),

		onMutate: async (status) => {
			await queryClient.cancelQueries({ queryKey: ['anime-status', animeId] })
			const previous = queryClient.getQueryData<AnimeListStatus | null>(['anime-status', animeId])
			queryClient.setQueryData(['anime-status', animeId], status)
			return { previous }
		},

		onError: (_err, _status, context) => {
			if (context?.previous !== undefined) {
				queryClient.setQueryData(['anime-status', animeId], context.previous)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['anime-status', animeId] })
		},
	})
}

export function useRemoveFromList(animeId: string, userId?: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: () => removeFromList(animeId),

		onMutate: async () => {
			if (userId) {
				await queryClient.cancelQueries({ queryKey: ['profile', userId] })
				const previous = queryClient.getQueryData(['profile', userId])

				queryClient.setQueryData(['profile', userId], (old: any) => ({
					...old,
					animeList: old.animeList.filter((entry: any) => entry.animeId !== animeId),
				}))

				return { previous }
			}
			return {}
		},

		onError: (_err, _vars, ctx) => {
			if (ctx?.previous && userId) {
				queryClient.setQueryData(['profile', userId], ctx.previous)
			}
		},

		onSettled: () => {
			if (userId) {
				queryClient.invalidateQueries({ queryKey: ['profile', userId] })
			}
			queryClient.invalidateQueries({ queryKey: ['anime-status', animeId] })
		},
	})
}
