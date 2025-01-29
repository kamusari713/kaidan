'use client'

import { FormErrorMessage } from '@/shared/components/shared'
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
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
			<div>
				{!!errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
				<Input {...register('username')} placeholder="Имя" />
			</div>
			<div>
				{!!errors.email && <FormErrorMessage>{errors.email.message}</FormErrorMessage>}
				<Input {...register('email')} type="email" placeholder="Почта" />
			</div>
			<div>
				{!!errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
				<Input {...register('password')} type="password" placeholder="Пароль" />
			</div>
			<Button disabled={isPending} type="submit" className="w-full">
				Регистрация
			</Button>
		</form>
	)
}
