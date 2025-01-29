'use client'

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
			{error && <p className="text-red-500 text-[14px]">{error.message}</p>}
			{!!errors.username && <p className="text-red-500 text-[14px]">{errors.username.message}</p>}
			<Input {...register('username')} placeholder="Имя пользователя" />
			{!!errors.password && <p className="text-red-500 text-[14px]">{errors.password.message}</p>}
			<Input {...register('password')} placeholder="Пароль" type="password" />
			<Button disabled={isPending} type="submit" className="w-full">
				Вход
			</Button>
		</form>
	)
}
