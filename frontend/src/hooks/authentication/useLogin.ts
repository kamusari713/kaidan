'use client'

import { loginUser } from '@/src/api/rest/authentitacion'
import { AuthResponse, LoginData } from '@/src/lib/types/authentication'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<AuthResponse, Error, LoginData>({
		mutationFn: (data: LoginData) => loginUser(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['auth'] })
			router.push('/')
		},
	})
}
