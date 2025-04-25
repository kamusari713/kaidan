'use client'

import { ReviewCard } from '@/components/common/reviews'
import { Card, CardContent, CardHeader, Input } from '@/components/ui'
import { useAuthorize } from '@/hooks/authentication'
import { useUserReviews } from '@/hooks/profile'
import { useParams } from 'next/navigation'
import { FC, useState } from 'react'

export const ReviewsCardSection: FC = () => {
	const params = useParams()
	const userId = params?.userId as string
	const { userData } = useAuthorize()
	const { reviewsData } = useUserReviews(userId)
	const [filter, setFilter] = useState('')

	const filteredReviews = reviewsData?.filter((review) => review.title.toLowerCase().includes(filter.toLowerCase())) || []

	return (
		<div className="flex flex-col gap-6 flex-grow">
			<Input placeholder="Фильтр по тексту" value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded" />
			<Card>
				<CardContent>
					<CardHeader className="font-bold text-xl">{userData && !filter ? 'Ваши отзывы:' : !userData && !filter ? 'Отзывы пользователя:' : ''}</CardHeader>
					<div className="flex flex-col gap-3 p-4">
						{filteredReviews.length > 0 ? (
							filteredReviews.map((review) => <ReviewCard review={review} linkToAnime={true} />)
						) : (
							<div className="flex h-full items-center justify-center text-foreground/60">{filter ? 'Ничего не найдено' : 'Нет комментариев'}</div>
						)}
					</div>
				</CardContent>
			</Card>
		</div>
	)
}
