'use client'

import { login } from '@/shared/api/actions'
import { Button, Input } from '@/shared/components/ui'
import React from 'react'

export default function LoginPage() {
	return (
		<form className="flex flex-col gap-4">
			<Input placeholder="Почта" required name="email" />
			<Input type="password" placeholder="Пароль" required name="password" />
			<Button
				onClick={(e) => {
					e.preventDefault()
					login({ usernameOrEmail: 'timur@a.ru', password: 'asd' })
				}}
				className="w-full"
			>
				Вход
			</Button>
		</form>
	)
}
