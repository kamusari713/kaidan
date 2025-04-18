import { addToAnimeList } from '@/src/api/rest/user/animeList'
import { AnimeListStatus, UserAnimeList } from '@/src/lib/types/animeList'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface AddContext {
	previous?: AnimeListStatus | null
}

export const useAddToList = (userId: string, animeId: string) => {
	const queryClient = useQueryClient()

	return useMutation<UserAnimeList, Error, AnimeListStatus, AddContext>({
		mutationFn: (status: AnimeListStatus) => addToAnimeList(userId, animeId, status),

		onMutate: async (status) => {
			await queryClient.cancelQueries({ queryKey: ['anime-status', animeId] })
			const previous = queryClient.getQueryData<AnimeListStatus | null>(['anime-status', animeId])
			queryClient.setQueryData(['anime-status', animeId], status)
			return { previous }
		},
		onError: (_error, _status, context) => {
			if (context?.previous !== undefined) {
				queryClient.setQueryData(['anime-status', animeId], context.previous)
			}
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['anime-status', animeId] })
		},
	})
}
