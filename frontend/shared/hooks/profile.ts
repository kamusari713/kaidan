import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { getProfile, getUserAnimeList, updateUserBio, updateUsername } from '@/shared/api/actions'

export function useUserAnimeList(userId: string) {
	return useQuery({
		queryKey: ['user-anime-list', userId],
		queryFn: async () => getUserAnimeList(userId),
	})
}

export function useProfile(userId: string) {
	return useQuery({
		queryKey: ['profile', userId],
		queryFn: () => getProfile(userId),
	})
}

export function useUpdateUsername(userId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (newName: string) => updateUsername(newName),

		onMutate: async (newName) => {
			await queryClient.cancelQueries({ queryKey: ['profile', userId] })

			const previous = queryClient.getQueryData(['profile', userId])

			queryClient.setQueryData(['profile', userId], (old: any) => ({
				...old,
				username: newName,
			}))

			return { previous }
		},

		onError: (_err, _name, ctx) => {
			if (ctx?.previous) {
				queryClient.setQueryData(['profile', userId], ctx.previous)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile', userId] })
		},
	})
}

export function useUpdateBio(userId: string) {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: (newBio: string) => updateUserBio(userId, newBio),

		onMutate: async (newBio) => {
			await queryClient.cancelQueries({ queryKey: ['profile', userId] })

			const previous = queryClient.getQueryData(['profile', userId])

			queryClient.setQueryData(['profile', userId], (old: any) => ({
				...old,
				bio: newBio,
			}))

			return { previous }
		},

		onError: (_err, _newBio, ctx) => {
			if (ctx?.previous) {
				queryClient.setQueryData(['profile', userId], ctx.previous)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile', userId] })
		},
	})
}
