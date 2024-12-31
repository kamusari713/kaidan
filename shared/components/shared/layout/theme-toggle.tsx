'use client'

import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'

export const ThemeToggle = () => {
	const { setTheme, resolvedTheme } = useTheme()
	const [mounted, setMounted] = useState(false)

	useEffect(() => {
		setMounted(true)
	}, [])

	const toggleTheme = () => {
		const themes = ['system', 'dark', 'light']
		const nextTheme = themes[(themes.indexOf(resolvedTheme || 'system') + 1) % themes.length]
		setTheme(nextTheme)
	}

	if (!mounted) {
		return null
	}

	return (
		<Button className="group" variant="ghost" onClick={toggleTheme}>
			{resolvedTheme === 'light' && (
				<div className="flex flex-row items-center justify-start gap-2 w-full group-hover:text-accent-foreground">
					<Sun className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card w-5 h-5" />
					Светлая
				</div>
			)}
			{resolvedTheme === 'dark' && (
				<div className="flex flex-row items-center justify-start gap-2 w-full group-hover:text-accent-foreground">
					<Moon className="stroke-accent fill-accent group-hover:stroke-card group-hover:fill-card w-5 h-5" />
					Темная
				</div>
			)}
		</Button>
	)
}
