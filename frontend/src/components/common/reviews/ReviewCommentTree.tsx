import { CommentTree } from '@/components/common/comments'
import { useReviewComments } from '@/hooks/review'
import { UserCredentials } from '@/types/user';
import { useQueryClient } from '@tanstack/react-query';

export const ReviewCommentTree = ({ isAuthorized, reviewId }: { isAuthorized: boolean; reviewId: string }) => {
	const { reviewCommentsData, isLoading, error } = useReviewComments(reviewId)

	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	if (isLoading) return <p className="text-m text-foreground">Загрузка комментариев...</p>
	if (error) return <p className="text-sm text-red-500">Ошибка при загрузке комментариев</p>
	if (!reviewCommentsData || reviewCommentsData.length === 0) return <p className="text-sm m-2 text-foregound">Пока нет комментариев</p>

	return <CommentTree isAdmin={userData?.role === "ROLE_ADMIN"} isAuthorized={isAuthorized} comments={reviewCommentsData} reviewId={reviewId} />
}
