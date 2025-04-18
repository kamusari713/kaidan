export interface AuthResponse {
	message: string
}

export interface LoginData {
	username: string
	password: string
}

export interface RegisterData {
	username: string
	email: string
	password: string
}

export interface ApiResponse<T> {
	data: T | undefined
	message: string
}

export type UserCredentials = {
	id: string
	username: string
	email: string
	role: string
}

export type MeResponse = ApiResponse<UserCredentials>
