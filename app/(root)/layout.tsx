import { Header } from '@/shared/components'
import React from 'react'

export default function HomeLayout({
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
