import { registerUser } from '@/services/rest/authentitacion'
import { RegisterData } from '@/types/authentication'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'

export const useRegisterUser = () => {
	const queryClient = useQueryClient()
	return useMutation({
		mutationFn: (userData: RegisterData) => registerUser(userData),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['users'] })
			toast.success('Пользователь создан!')
		},
	})
}
