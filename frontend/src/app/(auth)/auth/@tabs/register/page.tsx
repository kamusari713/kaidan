'use client'

import { FormErrorMessage } from '@/src/components/layout'
import { Button, Input } from '@/src/components/ui'
import { useRegister } from '@/src/hooks/authentication'
import { useRegisterForm } from '@/src/hooks/form'
import { RegisterFormData } from '@/src/lib/types/form'

export default function RegisterPage() {
	const { mutate: registerMutation, isPending, error } = useRegister()

	const onSubmit = (data: RegisterFormData) => {
		registerMutation(data)
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
