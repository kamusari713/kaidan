import { Container } from '@/shared/components/shared/layout'
import { ProfileHeader, ProfileTabs } from '@/shared/components/shared/profile'
import { Separator } from '@/shared/components/ui'
import { ReactNode } from 'react'

export default function ProfileLayout({ tabs }: { tabs: ReactNode }) {
	return (
		<main className="flex flex-col flex-grow gap-10 mb-10">
			<Container className="flex flex-col gap-6">
				<div className="flex flex-col bg-card rounded-xl border shadow ">
					<ProfileHeader />
					<Separator />
					<ProfileTabs />
				</div>
				<div>{tabs}</div>
			</Container>
		</main>
	)
}
