import { CommentEditor, ReviewCard, ReviewCommentTree, ReviewEditor } from '@/src/components/common/animePage'
import { NotAuthenticated } from '@/src/components/layout/notAuthenticated'
import { useAnimeReviews } from '@/src/hooks/review'
import { FC } from 'react'

interface Props {
	animeId: string
	userId?: string
}

export const AnimeReviewTab: FC<Props> = ({ animeId, userId }) => {
	const { data: reviewsData, isLoading, error } = useAnimeReviews(animeId)
	const myReview = reviewsData?.find((review) => review.userId === userId)

	if (isLoading) return <p className="text-center text-sm">Загрузка отзывов...</p>
	if (error) return <p className="text-red-500">Ошибка при получении отзывов</p>

	return (
		<div className="flex flex-col gap-6">
			{userId ? (
				!myReview ? (
					<div className="bg-background border rounded p-4 shadow-sm">
						<h2 className="text-lg font-semibold mb-2">Оставьте свой отзыв</h2>
						<ReviewEditor animeId={animeId} />
					</div>
				) : (
					<div className="text-sm text-foreground border border-dashed rounded p-3">Вы уже оставили отзыв.</div>
				)
			) : (
				<NotAuthenticated />
			)}

			{reviewsData?.length === 0 && <div className="text-center text-m text-foreground">Пока что никто не оставил отзыв. Станьте первым, кто поделится впечатлением!</div>}

			{reviewsData?.map((review) => (
				<div key={review.id} className="bg-background border rounded p-4 shadow-sm">
					<ReviewCard review={review} />

					<div className="mt-4 border-t pt-4">
						<CommentEditor reviewId={review.id} parentId={null} />
					</div>

					<div className="mt-2">
						<ReviewCommentTree reviewId={review.id} />
					</div>
				</div>
			))}
		</div>
	)
}
