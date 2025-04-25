'use client'

import { FormErrorMessage } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { useRegister } from '@/hooks/authentication'
import { useRegisterForm } from '@/hooks/form'
import { RegisterFormData } from '@/types/form'

const RegisterPage = () => {
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

export default RegisterPage
