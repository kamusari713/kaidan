'use client'

import { Button } from '@/shared/components/ui'
import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

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
				<div className="flex flex-row items-center justify-start gap-2 w-full group-hover:text-accent">
					<Sun className="stroke-foreground fill-foreground group-hover:stroke-accent group-hover:fill-accent" size={5} />
					Светлая
				</div>
			)}
			{resolvedTheme === 'dark' && (
				<div className="flex flex-row items-center justify-start gap-2 w-full group-hover:text-accent/60">
					<Moon className="stroke-foreground fill-foreground group-hover:stroke-accent/60 group-hover:fill-accent/60" size={5} />
					Темная
				</div>
			)}
		</Button>
	)
}
