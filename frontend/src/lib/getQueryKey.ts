import { NewComment } from '@/types/comments'

export const getQueryKey = (comment: NewComment): string[] => {
	if (comment.animeId) return ['anime-comments', comment.animeId]
	if (comment.reviewId) return ['review-comments', comment.reviewId]
	throw new Error('Комментарий должен иметь либо animeId, либо reviewId')
}
