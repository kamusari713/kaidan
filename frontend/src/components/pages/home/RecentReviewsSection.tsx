'use client'

import { ArrowRight, Skeleton } from '@/components/ui'
import { useRecentReviews } from '@/hooks/review'
import React from 'react'
import { RecentReviewCard } from './RecentReviewCard'

export const RecentReviewsSection: React.FC = () => {
	const { reviewsData, isLoading } = useRecentReviews()

	return (
		<div className="flex flex-col gap-2">
			<div className="flex items-center gap-2 ml-4">
				Последние отзывы
			</div>
			<div className="flex justify-between flex-wrap w-full gap-4">
				{isLoading ? (
					Array.from({ length: 8 }, (_, index) => (
						<div key={index} className="group/feedback-item w-[calc(50%-8px)] bg-card h-fit rounded-md border shadow hover:cursor-pointer hover:bg-accent/20">
							<Skeleton className="border rounded-md rounded-b-none h-20" />
							<div className="flex flex-col justify-between">
								<div className="flex flex-col px-4 py-3 gap-2">
									<Skeleton className="h-5 w-2/3 rounded-md" />
									<Skeleton className="h-4 w-full mt-1 rounded-md" />
									<Skeleton className="h-4 w-1/2 mt-1 rounded-md" />
								</div>
								<div className="flex justify-between text-[12px] px-4 py-3">
									<Skeleton className="h-4 w-1/4 rounded-md" />
									<Skeleton className="h-4 w-1/4 rounded-md" />
								</div>
							</div>
						</div>
					))
				) : reviewsData?.length === 0 ? (
					<div className="text-center text-foreground/60 mt-4">Нет последних отзывов</div>
				) : (
					reviewsData?.slice(0, 8).map((review) => <RecentReviewCard key={`recent-review-${review.id}`} review={review} />)
				)}
			</div>
		</div>
	)
}
