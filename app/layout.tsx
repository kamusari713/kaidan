import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import './globals.css'

const montserrat = localFont({
	src: '../public/fonts/Montserrat[wght].woff2',
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
			<body className={`${montserrat.className} antialiased w-auto bg-background`}>
				<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
					{children}
				</ThemeProvider>
			</body>
		</html>
	)
}
