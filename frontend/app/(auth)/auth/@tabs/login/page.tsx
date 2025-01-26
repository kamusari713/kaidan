'use client'

import { Button, Input } from '@/shared/components/ui'
import { useLogin } from '@/shared/hooks/auth'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

const MIN_SYMBOLS = 4

const loginSchema = z.object({
	username: z.string().min(4, `Имя должно быть минимум ${MIN_SYMBOLS} символов`),
	password: z.string().min(4, `Пароль должен быть минимум ${MIN_SYMBOLS} символа`),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginPage() {
	const { mutate } = useLogin()

	const onSubmit = (data: LoginFormData) => {
		mutate(data)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<LoginFormData>({
		resolver: zodResolver(loginSchema),
		defaultValues: {
			username: '',
			password: '',
		},
	})

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			<Input {...register('username')} placeholder="Имя пользователя" required aria-invalid={!!errors.username} />
			<Input {...register('password')} placeholder="Пароль" type="password" required aria-invalid={!!errors.password} />
			<Button type="submit" className="w-full">
				Вход
			</Button>
		</form>
	)
}
