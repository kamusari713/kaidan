import { banUser } from '@/services/rest/admin'
import { UserCredentials } from '@/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useBanUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ userId, banned }: { userId: string; banned: boolean }) => banUser(userId, banned),
		onMutate: async ({ userId, banned }) => {
			await queryClient.cancelQueries({ queryKey: ['users'] })
			const previousUsers = queryClient.getQueriesData({ queryKey: ['users'] })
			previousUsers.forEach(([key, data]) => {
				if (Array.isArray(data)) {
					const updatedData = data.map((user: UserCredentials) => (user.id === userId ? { ...user, banned } : user))
					queryClient.setQueryData(key, updatedData)
				}
			})
			return { previousUsers }
		},
		onError: (_err, _variables, context) => {
			context?.previousUsers.forEach(([key, data]) => {
				queryClient.setQueryData(key, data)
			})
		},
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			queryClient.invalidateQueries({ queryKey: ['profile'] })
			toast.success('Пользователь забанен!')
		},
	})
}
