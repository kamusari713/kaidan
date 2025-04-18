import { ApolloClientProvider, TanstackQueryProvider, ThemeProvider } from '@/src/components/common/providers'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'

const montserrat = localFont({
	src: '../../public/fonts/Montserrat[wght].woff2',
})

export const metadata: Metadata = {
	title: 'Kaidan',
	category: 'website',
	generator: 'Next.js',
	manifest: '/manifest.json',
	icons: {
		icon: '/favicon/favicon.ico',
	},
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={`${montserrat.className} antialiased w-auto bg-background`}>
				<ApolloClientProvider>
					<TanstackQueryProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</TanstackQueryProvider>
				</ApolloClientProvider>
			</body>
		</html>
	)
}
