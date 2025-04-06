import { Comment } from '@/shared/types/anime-page/comments'
import { useState } from 'react'
import { useTimeAgo } from '@/shared/hooks/dayjs'
import { CommentEditor } from './comment-editor'
import { Button } from '@/shared/components/ui'

interface CommentTreeProps {
	comments: Comment[]
	animeId?: string
	reviewId?: string
}

export const CommentTree = ({ comments, animeId, reviewId }: CommentTreeProps) => {
	const [replyingToId, setReplyingToId] = useState<string | null>(null)

	return (
		<ul className="pl-4 border-l">
			{comments.map((comment) => (
				<li key={comment.id} className="mb-2">
					<div className="p-2">
						<div className="flex gap-2">
							<p className="font-semibold">{comment.userName}</p>
							<p>{useTimeAgo(comment.createdAt)} </p>
						</div>
						<p>{comment.text}</p>
						<Button variant="link" className="text-accent text-sm" onClick={() => setReplyingToId(comment.id)}>
							Ответить
						</Button>
						{replyingToId === comment.id && <CommentEditor animeId={animeId} reviewId={reviewId} parentId={comment.id} onCancel={() => setReplyingToId(null)} />}
					</div>
					{comment.children?.length > 0 && <CommentTree comments={comment.children} animeId={animeId} reviewId={reviewId} />}
				</li>
			))}
		</ul>
	)
}
