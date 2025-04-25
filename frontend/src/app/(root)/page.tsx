import { Container } from '@/components/layout'
import { AnimeCarouselSection, RecentReviewsSection, RecentUpdatesSection } from '@/components/pages/home'

const HomePage = () => {
	return (
		<Container className="flex flex-col gap-10">
			<AnimeCarouselSection />
			<div className="flex gap-6">
				<RecentUpdatesSection />
				<div className="flex flex-col gap-6 w-1/2">
					<RecentReviewsSection />
				</div>
			</div>
		</Container>
	)
}

export default HomePage
