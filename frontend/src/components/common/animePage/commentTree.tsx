import { Button } from '@/src/components/ui'
import { useTimeAgo } from '@/src/hooks/utils'
import { Comment } from '@/src/lib/types/comments'
import { useState } from 'react'
import { CommentEditor } from './commentEditor'

interface CommentTreeProps {
	comments: Comment[]
	animeId?: string
	reviewId?: string
}

interface CommentItemProps {
	comment: Comment
	animeId?: string
	reviewId?: string
	replyingToId: string | null
	setReplyingToId: (comment: string | null) => void
}

const CommentItem = ({ comment, animeId, reviewId, replyingToId, setReplyingToId }: CommentItemProps) => {
	return (
		<li className="mb-2">
			<div className="p-2">
				<div className="flex gap-2">
					<p className="font-semibold">{comment.userName}</p>
					<p>{useTimeAgo(comment.createdAt)} </p>
				</div>
				<p>{comment.text}</p>
				<Button variant="link" className="text-sm" onClick={() => setReplyingToId(comment.id)}>
					Ответить
				</Button>
				{replyingToId === comment.id && <CommentEditor animeId={animeId} reviewId={reviewId} parentId={comment.id} onCancel={() => setReplyingToId(null)} />}
			</div>
			{comment.children?.length > 0 && <CommentTree comments={comment.children} animeId={animeId} reviewId={reviewId} />}
		</li>
	)
}

export const CommentTree = ({ comments, animeId, reviewId }: CommentTreeProps) => {
	const [replyingToId, setReplyingToId] = useState<string | null>(null)

	return (
		<ul className="pl-4 border-l">
			{comments.map((comment) => (
				<CommentItem key={comment.id} comment={comment} animeId={animeId} reviewId={reviewId} replyingToId={replyingToId} setReplyingToId={setReplyingToId} />
			))}
		</ul>
	)
}
