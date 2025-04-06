import { useAnimeReviews } from '@/shared/hooks/review'
import { AnimePageTabPropsWithUserId } from '@/shared/types/anime-page/props'
import { FC } from 'react'
import { ReviewCard, CommentEditor, ReviewEditor, ReviewCommentTree } from '../'
import { NotAuthenticated } from '@/shared/components/shared/layout/not-authenticated'

export const AnimeReviewTab: FC<AnimePageTabPropsWithUserId> = ({ animeId, userId }) => {
	const { data: reviews, isLoading, error } = useAnimeReviews(animeId)
	const myReview = reviews?.find((r) => r.userId === userId)

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

			{reviews?.length === 0 && <div className="text-center text-m text-foreground">Пока что никто не оставил отзыв. Станьте первым, кто поделится впечатлением!</div>}

			{reviews?.map((review) => (
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
