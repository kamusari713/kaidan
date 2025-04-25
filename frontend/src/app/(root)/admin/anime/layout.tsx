'use client'

import { Container } from '@/components/layout'
import { useAuthorize } from '@/hooks/authentication'
import { useRouter } from 'next/navigation'
import { ReactNode, useEffect } from 'react'

export default function AdminLayout({
	children,
}: Readonly<{
	children: ReactNode
}>) {
	// const router = useRouter()
	// const { userData, isAdmin } = useAuthorize()

	// useEffect(() => {
	// 	const checkAuth = async () => {
	// 		if (!userData || !isAdmin) {
	// 			router.push('/')
	// 		}
	// 	}
	// 	checkAuth()
	// }, [userData, isAdmin])

	return <Container>{children}</Container>
}
