'use client'

import { Container } from '@/components/layout'
import { ProfileHeader, ProfileTabs } from '@/components/pages/profile'
import { Separator } from '@/components/ui'
import { useParams } from 'next/navigation'
import { ReactNode } from 'react'

const ProfileLayout = ({ tabs }: { tabs: ReactNode }) => {
	const params = useParams()
	const userId = params?.userId as string

	return (
		<main className="flex flex-col flex-grow gap-10 mb-10">
			<Container className="flex flex-col gap-6">
				<div className="flex flex-col bg-card rounded-md border shadow ">
					<ProfileHeader userId={userId} />
					<Separator />
					<ProfileTabs userId={userId} />
				</div>
				<div>{tabs}</div>
			</Container>
		</main>
	)
}

export default ProfileLayout
