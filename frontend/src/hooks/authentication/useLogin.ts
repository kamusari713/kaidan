'use client'

import { loginUser } from '@/services/rest/authentitacion'
import { LoginData } from '@/types/authentication'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useLogin = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<void, Error, LoginData>({
		mutationFn: (data: LoginData) => loginUser(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['auth'] })
			await queryClient.invalidateQueries({ queryKey: ['anime-reviews'] })
			router.push('/')
			toast.success('Вы успешно авторизовались!')
		},
	})
}
