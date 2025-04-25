import { updateProfile } from '@/services/rest/user/profile'
import { UserProfile } from '@/types/profile'
import { useMutation, useQueryClient } from '@tanstack/react-query'

export const useUpdateProfile = (userId: string) => {
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: ({ username, bio }: { username: string; bio: string }) => updateProfile(userId, username, bio),
		onMutate: async (newData) => {
			await queryClient.cancelQueries({ queryKey: ['profile', userId] })

			const previousProfile = queryClient.getQueryData(['profile', userId])

			queryClient.setQueryData(['profile', userId], (old: UserProfile) => ({
				...old,
				username: newData.username,
				bio: newData.bio,
			}))

			return { previousProfile }
		},
		onError: (_err, _newData, context) => {
			queryClient.setQueryData(['profile', userId], context?.previousProfile)
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['profile', userId] })
			queryClient.invalidateQueries({ queryKey: ['auth'] })
		},
	})
}
