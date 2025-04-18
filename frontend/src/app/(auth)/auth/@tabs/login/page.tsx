'use client'

import { FormErrorMessage } from '@/src/components/layout'
import { Button, Input } from '@/src/components/ui'
import { useLogin } from '@/src/hooks/authentication'
import { useLoginForm } from '@/src/hooks/form'
import { LoginFormData } from '@/src/lib/types/form'

export default function LoginPage() {
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
