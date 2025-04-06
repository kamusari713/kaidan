import Link from 'next/link'
import { FC } from 'react'

export const NotAuthenticated: FC = () => {
	return (
		<div className="border p-4 rounded text-sm text-foreground bg-background">
			Вы не авторизированы,
			<Link className="text-primary underline" href="/auth/login">
				войдите в аккаунт
			</Link>
		</div>
	)
}
