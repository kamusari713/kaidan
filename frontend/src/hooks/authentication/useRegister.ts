'use client'

import { registerUser } from '@/services/rest/authentitacion'
import { RegisterData } from '@/types/authentication'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useRegister = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<void, Error, RegisterData>({
		mutationFn: (data: RegisterData) => registerUser(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['auth'] })
			router.push('/')
			toast.success('Вы успешно зарегистрировались!')
		},
	})
}
