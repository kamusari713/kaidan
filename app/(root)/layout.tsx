import { Header } from '@/shared/components'
import React from 'react'

export function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<main>
			<Header />
			{children}
		</main>
	)
}
