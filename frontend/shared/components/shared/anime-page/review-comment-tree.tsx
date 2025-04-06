import { useReviewComments } from '@/shared/hooks/review'
import { CommentTree } from './comment-tree'

export const ReviewCommentTree = ({ reviewId }: { reviewId: string }) => {
	const { data: comments, isLoading, error } = useReviewComments(reviewId)

	if (isLoading) return <p className="text-m text-foreground">Загрузка комментариев...</p>
	if (error) return <p className="text-sm text-red-500">Ошибка при загрузке комментариев</p>
	if (!comments || comments.length === 0) return <p className="text-m text-foregound">Нет комментариев</p>

	return <CommentTree comments={comments} reviewId={reviewId} />
}
