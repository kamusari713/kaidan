'use client'

import { FormErrorMessage } from '@/shared/components/shared'
import { Button, Input } from '@/shared/components/ui'
import { useLogin, useLoginForm } from '@/shared/hooks'
import { LoginFormData } from '@/shared/types'

export default function LoginPage() {
	const { mutate, isPending, error } = useLogin()

	const onSubmit = (data: LoginFormData) => {
		mutate(data)
	}

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useLoginForm()

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
			{error && <FormErrorMessage>{error.message}</FormErrorMessage>}
			<div>
				{!!errors.username && <FormErrorMessage>{errors.username.message}</FormErrorMessage>}
				<Input {...register('username')} placeholder="Имя пользователя" />
			</div>
			<div>
				{!!errors.password && <FormErrorMessage>{errors.password.message}</FormErrorMessage>}
				<Input {...register('password')} placeholder="Пароль" type="password" />
			</div>
			<Button disabled={isPending} type="submit" className="w-full">
				Вход
			</Button>
		</form>
	)
}
