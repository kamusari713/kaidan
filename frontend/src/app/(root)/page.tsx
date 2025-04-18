import { AnimeCarouselSection, ForumRecentThreadsSection, RecentReviewsSection, RecentUpdatesSection } from '@/src/components/common/sections'
import { Container } from '@/src/components/layout'

export default function HomePage() {
	return (
		<>
			<Container className="flex flex-col gap-10">
				<AnimeCarouselSection />
				<div className="flex gap-6">
					<RecentUpdatesSection />
					<div className="flex flex-col gap-6 w-1/2">
						<ForumRecentThreadsSection />
						<RecentReviewsSection />
					</div>
				</div>
			</Container>
		</>
	)
}
