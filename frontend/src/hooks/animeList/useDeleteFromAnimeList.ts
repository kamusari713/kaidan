import { deleteFromAnimeList } from '@/services/rest/user/anime'
import { UserAnimeList } from '@/types/animeList'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface DeleteContext {
	previous?: UserAnimeList[]
}

export const useDeleteFromAnimeList = (userId: string, animeId: string) => {
	const queryClient = useQueryClient()

	return useMutation<void, Error, void, DeleteContext>({
		mutationFn: () => deleteFromAnimeList(userId, animeId),

		onMutate: async () => {
			if (!userId) return {}

			const queryKey = ['user-anime-list', userId]
			await queryClient.cancelQueries({ queryKey })
			const previous = queryClient.getQueryData<UserAnimeList[]>(queryKey)

			queryClient.setQueryData<UserAnimeList[]>(queryKey, (old) => {
				if (!old) return old
				return old.filter((entry) => entry.animeId !== animeId)
			})

			return { previous }
		},

		onError: (_error, _variables, context) => {
			if (context?.previous && userId) {
				queryClient.setQueryData(['user-anime-list', userId], context.previous)
			}
		},

		onSettled: () => {
			if (userId) {
				queryClient.invalidateQueries({ queryKey: ['user-anime-list', userId] })
			}
			queryClient.invalidateQueries({ queryKey: ['anime-status', animeId] })
			toast.success('Аниме удалено из списка!')
		},
	})
}
