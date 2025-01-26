'use client'

import { apiClient } from '@/shared/api/client'
import { AuthResponse, LoginData, RegisterData } from '@/shared/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
	const router = useRouter()

	return useMutation<AuthResponse, Error, LoginData>({
		mutationFn: async (data) => {
			const response = await apiClient.post('/public/auth/login', data)
			return response.data
		},
		onSuccess: () => {
			router.push('/')
		},
	})
}

export const useRegister = () => {
	const router = useRouter()

	return useMutation<AuthResponse, Error, RegisterData>({
		mutationFn: async (data) => {
			const response = await apiClient.post('/public/auth/register', data)
			return response.data
		},
		onSuccess: () => {
			router.push('/')
		},
	})
}
