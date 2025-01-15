'use server'

import { API } from '@/shared/api/instance'
import { cookies } from 'next/headers'

export async function login({ usernameOrEmail, password }: { usernameOrEmail: string; password: string }) {
	const res = await API.post('/auth/signin', {
		usernameOrEmail,
		password,
	})

	cookies().set('token', res.data.token)
}
