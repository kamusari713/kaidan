import { createUser } from '@/services/rest/admin'
import { CreateUserFormData } from '@/types/form'
import { UserDTO } from '@/types/user'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

interface MutationContext {
	previousUsers: UserDTO[]
}

export const useCreateUser = () => {
	const queryClient = useQueryClient()
	return useMutation<void, Error, CreateUserFormData, MutationContext>({
		mutationFn: (userData) => createUser(userData),

		onMutate: async (newUser): Promise<MutationContext> => {
			await queryClient.cancelQueries({ queryKey: ['users'] })

			const previousUsers = queryClient.getQueryData<UserDTO[]>(['users']) || []

			const tempUser: UserDTO = {
				id: `temp-${Date.now()}`,
				username: newUser.username,
				email: newUser.email,
				role: newUser.role,
				bio: '',
				banned: false,
			}

			queryClient.setQueryData(['users'], [tempUser, ...previousUsers])

			return { previousUsers }
		},

		onError: (err, _, context) => {
			if (context?.previousUsers) {
				queryClient.setQueryData(['users'], context.previousUsers)
			}
			toast.error(`Ошибка: ${err.message}`)
		},

		onSuccess: () => {
			toast.success('Пользователь успешно создан')
		},

		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
		},
	})
}
