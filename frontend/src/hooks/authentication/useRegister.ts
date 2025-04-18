'use client'

import { registerUser } from '@/src/api/rest/authentitacion'
import { AuthResponse, RegisterData } from '@/src/lib/types/authentication'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useRegister = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<AuthResponse, Error, RegisterData>({
		mutationFn: (data: RegisterData) => registerUser(data),
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['auth'] })
			router.push('/')
		},
	})
}
