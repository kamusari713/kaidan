'use client'

import { FormErrorMessage } from '@/components/layout'
import { Button, Input } from '@/components/ui'
import { useLogin } from '@/hooks/authentication'
import { useLoginForm } from '@/hooks/form'
import { LoginFormData } from '@/lib/types/form'

const LoginPage = () => {
	const { mutate: loginMutation, isPending, error } = useLogin()

	const onSubmit = (data: LoginFormData) => {
		loginMutation(data)
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

export default LoginPage
