import { updateProfileUsername } from '@/src/api/rest/user/profile'
import { UserProfile } from '@/src/lib/types/profile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateUsernameContext {
	previous?: UserProfile
}

export const useUpdateProfileUsername = (userId: string) => {
	const queryClient = useQueryClient()

	return useMutation<UserProfile, Error, string, UpdateUsernameContext>({
		mutationFn: (newName: string) => updateProfileUsername(userId, newName),

		onMutate: async (newName) => {
			await queryClient.cancelQueries({ queryKey: ['profile', userId] })
			const previous = queryClient.getQueryData<UserProfile>(['profile', userId])
			queryClient.setQueryData<UserProfile>(['profile', userId], (old) => {
				if (!old) return old
				return { ...old, username: newName }
			})
			return { previous }
		},

		onError: (_error, _newName, context) => {
			if (context?.previous) {
				queryClient.setQueryData(['profile', userId], context.previous)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile', userId] })
		},
	})
}
