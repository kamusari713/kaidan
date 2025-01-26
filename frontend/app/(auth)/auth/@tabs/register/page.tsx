'use client'

import { Button, Input } from '@/shared/components/ui'
import { useRegister } from '@/shared/hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MIN_SYMBOLS = 4

const RegisterForm = z.object({
	email: z.string().email(),
	username: z.string().min(4, `Имя должно быть минимум ${MIN_SYMBOLS} символов`),
	password: z.string().min(4, `Пароль должен быть минимум ${MIN_SYMBOLS} символа`),
})

type RegisterFormData = z.infer<typeof RegisterForm>

export default function RegisterPage() {
	const { mutate, isPending, error } = useRegister()

	const onSubmit = (data: RegisterFormData) => {
		mutate(data)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<RegisterFormData>({
		resolver: zodResolver(RegisterForm),
		defaultValues: {
			username: '',
			email: '',
			password: '',
		},
	})
	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{error && <p>{error.message}</p>}
			<Input {...register('username')} placeholder="Имя" required aria-invalid={!!errors.username} />
			<Input {...register('email')} type="email" placeholder="Почта" required aria-invalid={!!errors.email} />
			<Input {...register('password')} type="password" placeholder="Пароль" required aria-invalid={!!errors.password} />
			<Button type="submit" disabled={isPending} className="w-full">
				Регистрация
			</Button>
		</form>
	)
}
