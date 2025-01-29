'use server'

import { LoginData, RegisterData } from '../types/auth'
import { apiClient } from './client'

export async function login(data: LoginData) {
	const response = await apiClient.post('/public/auth/login', data)
	return response.data
}

export async function register(data: RegisterData) {
	const response = await apiClient.post('/public/auth/register', data)
	return response.data
}
