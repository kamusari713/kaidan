'use client'

import { ThemeProvider as NextThemeProvider } from 'next-themes'
import { FC, PropsWithChildren } from 'react'

export const ThemeProvider: FC<PropsWithChildren> = ({ children }) => {
	return (
		<NextThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
			{children}
		</NextThemeProvider>
	)
}
