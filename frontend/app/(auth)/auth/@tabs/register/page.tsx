import { Button, Input } from '@/shared/components/ui'
import React from 'react'

export default function RegisterPage() {
	return (
		<form className="space-y-4">
			<Input type="text" placeholder="Имя" required />
			<Input type="email" placeholder="Почта" required />
			<Input type="password" placeholder="Пароль" required />
			<Button type="submit" className="w-full">
				Регистрация
			</Button>
		</form>
	)
}
