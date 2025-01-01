import { SectionLatestForum, SectionLatestRatings, SectionLatestUpdates, SectionUpdatesTabs } from '@/shared/components/shared/home'
import { Container, Footer } from '@/shared/components/shared/layout'

export default function HomePage() {
	return (
		<>
			<Container className="flex flex-col gap-10">
				<SectionLatestUpdates />
				<div className="flex gap-6">
					<SectionUpdatesTabs />
					<div className="flex flex-col gap-6 w-1/2">
						<SectionLatestForum />
						<SectionLatestRatings />
					</div>
				</div>

				<Footer />
			</Container>
		</>
	)
}
