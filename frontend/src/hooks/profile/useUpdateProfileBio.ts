import { updateProfileBio } from '@/src/api/rest/user/profile'
import { UserProfile } from '@/src/lib/types/profile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

interface UpdateBioContext {
	previous?: UserProfile
}

export const useUpdateProfileBio = (userId: string, newBio: string) => {
	const queryClient = useQueryClient()

	return useMutation<UserProfile, Error, string, UpdateBioContext>({
		mutationFn: () => updateProfileBio(userId, newBio),

		onMutate: async () => {
			await queryClient.cancelQueries({ queryKey: ['profile', userId] })
			const previous = queryClient.getQueryData<UserProfile>(['profile', userId])
			queryClient.setQueryData<UserProfile>(['profile', userId], (old) => {
				if (!old) return old
				return { ...old, bio: newBio }
			})
			return { previous }
		},

		onError: (_error, _newBio, context) => {
			if (context?.previous) {
				queryClient.setQueryData(['profile', userId], context.previous)
			}
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile', userId] })
		},
	})
}
