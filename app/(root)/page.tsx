import { Container } from '@/shared/components'
import { SectionLatestForum } from './section-latest-forum'
import { SectionLatestRatings } from './section-latest-ratings'
import { SectionLatestUpdates } from './section-latest-updates'
import { SectionUpdatesTabs } from './section-updates-tabs'

export default function Home() {
	return (
		<>
			<Container>
				<SectionLatestUpdates />
				<div className="flex gap-6 mt-10">
					<SectionUpdatesTabs />
					<div className="flex flex-col gap-6 w-1/2">
						<SectionLatestForum />
						<SectionLatestRatings />
					</div>
				</div>
			</Container>
		</>
	)
}
