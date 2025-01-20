'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ThemeProvider } from 'next-themes'
import localFont from 'next/font/local'
import './globals.css'

const montserrat = localFont({
	src: '../public/fonts/Montserrat[wght].woff2',
})

// export const metadata: Metadata = {
// 	title: 'Kaidan',
// }

const queryClient = new QueryClient()

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en">
			<head />
			<body className={`${montserrat.className} antialiased w-auto bg-background`}>
				<QueryClientProvider client={queryClient}>
					<ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
						{children}
					</ThemeProvider>
					<ReactQueryDevtools initialIsOpen={false} />
				</QueryClientProvider>
			</body>
		</html>
	)
}
