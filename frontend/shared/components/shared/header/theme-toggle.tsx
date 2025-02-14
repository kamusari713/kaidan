'use client'

import { Button } from '@/shared/components/ui'
import { Moon, Sun } from '@/shared/components/ui/icons'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleTheme = () => {
		const themes = ['light', 'dark']
		const nextIndex = (themes.indexOf(resolvedTheme!) + 1) % themes.length
		setTheme(themes[nextIndex])
	}

	if (!mounted) return null

	return (
		<Button variant="ghost" onClick={toggleTheme}>
			{resolvedTheme === 'light' && (
				<div className="flex flex-row items-center justify-start gap-2 w-full">
					<Sun />
					Светлая
				</div>
			)}
			{resolvedTheme === 'dark' && (
				<div className="flex flex-row items-center justify-start gap-2 w-full">
					<Moon />
					Темная
				</div>
			)}
		</Button>
	)
}
