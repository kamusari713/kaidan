import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { LoginFormData, loginSchema, RegisterFormData } from '../types'
import { registerSchema } from '../types/form-schemas'

export const useLoginForm = () => {
	return useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})
}

export const useRegisterForm = () => {
	return useForm<RegisterFormData>({
		resolver: zodResolver(registerSchema),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	})
}
