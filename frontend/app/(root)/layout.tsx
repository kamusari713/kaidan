import { Footer, Header } from '@/shared/components/shared/layout'
import React from 'react'

export default function HomeLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<div className="flex flex-col w-full min-h-screen gap-10">
			<Header />
			{children}
			<Footer />
		</div>
	)
}
