'use'

import { ThemeProvider } from '@/shared/components'
import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const nunito = localFont({
	src: '../public/fonts/NunitoRegular.woff',
})

export const metadata: Metadata = {
	title: 'Kaidan',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head />
			<body className={`${nunito.className} antialiased w-auto bg-background`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
