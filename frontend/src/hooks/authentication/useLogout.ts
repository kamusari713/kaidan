'use client'

import { logoutUser } from '@/src/api/rest/authentitacion'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'

export const useLogout = () => {
	const router = useRouter()
	const queryClient = useQueryClient()

	return useMutation<void, Error>({
		mutationFn: () => logoutUser(),
		onSuccess: () => {
			queryClient.setQueryData(['auth'], null)
			router.push('/')
		},
	})
}
