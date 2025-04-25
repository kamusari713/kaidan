import { updateUser } from '@/services/rest/admin'
import { UserCredentials, UserDTO } from '@/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useUpdateUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: ({ userId, updateData }: { userId: string; updateData: UserDTO }) => updateUser(userId, updateData),
		onMutate: async ({ userId, updateData }) => {
			await queryClient.cancelQueries({ queryKey: ['users'] })
			const previousUsers = queryClient.getQueriesData({ queryKey: ['users'] })
			previousUsers.forEach(([key, data]) => {
				if (Array.isArray(data)) {
					const updatedData = data.map((user: UserCredentials) => (user.id === userId ? { ...user, ...updateData } : user))
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
			toast.success('Пользователь обновлен!')
		},
	})
}
