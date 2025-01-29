'use client'

import { AuthResponse, LoginData, RegisterData } from '@/shared/types/auth'
import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { login, register } from '../api/actions'

export const useLogin = () => {
	const router = useRouter()

	return useMutation<AuthResponse, Error, LoginData>({
		mutationFn: login,
		onSuccess: () => {
			router.push('/')
		},
	})
}

export const useRegister = () => {
	const router = useRouter()

	return useMutation<AuthResponse, Error, RegisterData>({
		mutationFn: register,
		onSuccess: () => {
			router.push('/')
		},
	})
}
