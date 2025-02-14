import { LoginData, RegisterData } from '@/shared/types'
import { apiClient } from './client'

export async function login(data: LoginData) {
	const response = await apiClient.post('/public/auth/login', data)
	return response.data
}

export async function register(data: RegisterData) {
	const response = await apiClient.post('/public/auth/register', data)
	return response.data
}

export async function refresh() {
	const response = await apiClient.post('/private/auth/logout')
	return response.data
}

export async function me<UserCredentials>() {
	const response = await apiClient.get<UserCredentials>('/private/auth/me')
	return response.data
}
