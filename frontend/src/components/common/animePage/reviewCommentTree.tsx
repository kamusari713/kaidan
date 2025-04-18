import { useReviewComments } from '@/src/hooks/review'
import { CommentTree } from './commentTree'

export const ReviewCommentTree = ({ reviewId }: { reviewId: string }) => {
	const { data: reviewCommentsData, isLoading, error } = useReviewComments(reviewId)

	if (isLoading) return <p className="text-m text-foreground">Загрузка комментариев...</p>
	if (error) return <p className="text-sm text-red-500">Ошибка при загрузке комментариев</p>
	if (!reviewCommentsData || reviewCommentsData.length === 0) return <p className="text-m text-foregound">Нет комментариев</p>

	return <CommentTree comments={reviewCommentsData} reviewId={reviewId} />
}
