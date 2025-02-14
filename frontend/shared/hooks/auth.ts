'use client'

import { login, me, register } from '@/shared/api/actions'
import { AuthResponse, LoginData, RegisterData, UserCredentials } from '@/shared/types/auth'
import { useMutation, useQuery } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

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

export const useAuthorize = () => {
	const { data, isLoading } = useQuery<UserCredentials, boolean>({
		queryKey: ['auth'],
		queryFn: me,
		staleTime: 5 * 60 * 1000,
	})
	const isGuest = !data
	return { data, isGuest, isLoading }
}
