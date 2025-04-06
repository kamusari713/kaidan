'use client'

import { login, logout, me, register } from '@/shared/api/actions'
import { AuthResponse, LoginData, RegisterData, UserCredentials } from '@/shared/types/auth'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogin = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<AuthResponse, Error, LoginData>({
		mutationFn: login,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['auth'] })

			router.push('/')
		},
	})
}

export const useRegister = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<AuthResponse, Error, RegisterData>({
		mutationFn: register,
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ['auth'] })

			router.push('/')
		},
	})
}

export const useLogout = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation({
		mutationFn: logout,

		onSuccess: () => {
			queryClient.setQueryData(['auth'], null)

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
