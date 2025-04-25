import { LoginFormData, loginSchema } from '@/types/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

export const useLoginForm = () => {
	return useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})
}
