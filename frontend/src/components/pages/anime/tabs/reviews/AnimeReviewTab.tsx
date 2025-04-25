import { CommentEditor } from '@/components/common/comments'
import { ReviewCard, ReviewCommentTree, ReviewEditor } from '@/components/common/reviews'
import { NotAuthenticated } from '@/components/layout'
import { useAnimeReviews } from '@/hooks/review'
import { FC } from 'react'

interface Props {
	animeId: string
	userId?: string
}

export const AnimeReviewTab: FC<Props> = ({ animeId, userId }) => {
	const { reviewsData, isLoading, error } = useAnimeReviews(animeId)
	const myReview = reviewsData?.find((review) => review.userId === userId)

	if (isLoading) return <p className="text-center text-sm">Загрузка отзывов...</p>
	if (error) return <p className="text-red-500">Ошибка при получении отзывов</p>

	return (
		<div className="flex flex-col gap-2">
			{userId ? (
				!myReview ? (
					<div className="flex flex-col gap-2 p-2 rounded">
						<h2 className="text-lg font-semibold">Оставьте свой отзыв</h2>
						<ReviewEditor animeId={animeId} />
					</div>
				) : (
					<h2 className="text-sm text-foreground border border-dashed rounded p-3 mx-2">Вы уже оставили отзыв.</h2>
				)
			) : (
				<NotAuthenticated />
			)}

			{reviewsData?.length === 0 && <div className="text-center text-m text-foreground">Пока что никто не оставил отзыв. Станьте первым, кто поделится впечатлением!</div>}

			{reviewsData?.map((review) => (
				<div key={review.id} className="p-2">
					<ReviewCard review={review} animeId={animeId} linkToUser={true} />
					<div className="p-4">
						<CommentEditor reviewId={review.id} parentId={null} />
					</div>

					<ReviewCommentTree isAuthorized={!!userId} reviewId={review.id} />
				</div>
			))}
		</div>
	)
}
