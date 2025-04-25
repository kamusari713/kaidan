import { ApolloClientProvider, TanstackQueryProvider, ThemeProvider } from '@/components/common/providers'
import { Metadata } from 'next'
import localFont from 'next/font/local'
import { Toaster } from 'react-hot-toast'
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

const RootLayout = ({
	children,
}: Readonly<{
	children: React.ReactNode
}>) => {
	return (
		<html lang="en" suppressHydrationWarning>
			<head />
			<body className={`${montserrat.className} antialiased w-auto bg-background`}>
				<ApolloClientProvider>
					<TanstackQueryProvider>
						<ThemeProvider>{children}</ThemeProvider>
					</TanstackQueryProvider>
				</ApolloClientProvider>
				<Toaster position="top-center" />
			</body>
		</html>
	)
}

export default RootLayout
