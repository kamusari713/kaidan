import { RegisterFormData, registerSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

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
