'use client'

import { logoutUser } from '@/services/rest/authentitacion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import toast from 'react-hot-toast'

export const useLogout = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<void, Error>({
		mutationFn: () => logoutUser(),
		onSuccess: async () => {
			await queryClient.setQueryData(['auth'], null)
			await queryClient.invalidateQueries({ queryKey: ['anime-reviews'] })
			router.push('/')
			toast.success('Вы успешно вышли из аккаунта!')
		},
	})
}
