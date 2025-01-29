'use client'

import { Button, Input } from '@/shared/components/ui'
import { useRegister, useRegisterForm } from '@/shared/hooks'
import { RegisterFormData } from '@/shared/types'

export default function RegisterPage() {
	const { mutate, isPending, error } = useRegister()

	const onSubmit = (data: RegisterFormData) => {
		mutate(data)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useRegisterForm()

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
			{error && <p className="text-red-500 text-[14px]">{error.message}</p>}
			{!!errors.username && <p className="text-red-500 text-[14px]">{errors.username.message}</p>}
			<Input {...register('username')} placeholder="Имя" />
			{!!errors.email && <p className="text-red-500 text-[14px]">{errors.email.message}</p>}
			<Input {...register('email')} type="email" placeholder="Почта" />
			{!!errors.password && <p className="text-red-500 text-[14px]">{errors.password.message}</p>}
			<Input {...register('password')} type="password" placeholder="Пароль" />
			<Button disabled={isPending} type="submit" className="w-full">
				Регистрация
			</Button>
		</form>
	)
}
