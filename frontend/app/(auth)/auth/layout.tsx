'use client'

import { Tabs, TabsList, TabsTrigger } from '@/shared/components/ui'
import { usePathname, useRouter } from 'next/navigation'
import { ReactNode } from 'react'
import '../../globals.css'

export default function AuthLayout({ tabs }: { tabs: ReactNode }) {
	const router = useRouter()
	const pathname = usePathname()

	const currentTab = pathname.split('/').pop() || 'login'

	const handleTabChange = (tab: string) => {
		router.push(`/auth/${tab}`)
	}
	return (
		<main className="flex flex-col gap-[100px] items-center h-screen">
			<div className="text-center text-[60px] mt-[10%] tracking-[11px]">KAIDAN</div>
			<div className="flex flex-col gap-6">
				<Tabs value={currentTab || 'login'} onValueChange={handleTabChange}>
					<TabsList>
						<TabsTrigger variant={'section'} value="login">
							Вход
						</TabsTrigger>
						<TabsTrigger variant={'section'} value="register">
							Регистрация
						</TabsTrigger>
					</TabsList>
				</Tabs>
				{tabs}
			</div>
		</main>
	)
}
