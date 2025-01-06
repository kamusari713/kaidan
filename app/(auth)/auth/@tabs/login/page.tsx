import { Button, Input } from '@/shared/components/ui'
import React from 'react'

export default function LoginPage() {
	return (
		<form className="flex flex-col gap-4">
			<Input type="email" placeholder="Почта" required />
			<Input type="password" placeholder="Пароль" required />
			<Button type="submit" className="w-full">
				Вход
			</Button>
		</form>
	)
}
