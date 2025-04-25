import { ReviewStatusIcon, ThumbsUp } from '@/components/ui'
import { useDisplayName, useTimeAgo } from '@/hooks/utils'
import { ReviewStatusLabels } from '@/lib/constants'
import { ReviewCardDTO, ReviewStatus } from '@/types/review'
import Image from 'next/image'
import Link from 'next/link'
import { FC } from 'react'

interface RecentReviewCardProps {
	review: ReviewCardDTO
}

export const RecentReviewCard: FC<RecentReviewCardProps> = ({ review }) => {
	const reviewStatusClassName = `${review.status === 'POSITIVE' ? 'text-green-600' : review.status === 'NEGATIVE' ? 'text-red-600' : ''}`
	const reviewStatusName = useDisplayName<ReviewStatus>({ status: review.status, labels: ReviewStatusLabels })

	return (
		<Link href={`/anime/${review.animeId}`} key={review.id} className="group/feedback-item w-[calc(50%-8px)] bg-card h-fit rounded-md border shadow hover:cursor-pointer hover:bg-primary/20">
			<div className="relative h-20">
				<Image src={review.animeBanner} alt="Anime banner" fill className="object-cover rounded-t-md" />
			</div>
			<div className="flex flex-col justify-between">
				<div className="flex flex-col px-4 py-3 gap-2">
					<div className="group-hover/feedback-item:text-primary text-[15px] font-bold">{review.title}</div>
					<div className="line-clamp-3 text-[14px] text-foreground/60">{review.text}</div>
				</div>
				<div className="flex justify-between text-[12px] px-4 py-3">
					<div className="flex gap-4">
						<div className="flex gap-2 items-center text-foreground/60">
							<ThumbsUp />
							{review.likes}
						</div>
						<div className="flex gap-2">
							<ReviewStatusIcon status={review.status} />
							<div className={reviewStatusClassName}>{reviewStatusName}</div>
						</div>
					</div>
					<div className="text-foreground/60 line-clamp-1">{useTimeAgo(review.createdAt)}</div>
				</div>
			</div>
		</Link>
	)
}
