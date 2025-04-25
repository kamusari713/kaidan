import { Button } from '@/components/ui'
import { useDeleteComment } from '@/hooks/admin'
import { useTimeAgo } from '@/hooks/utils'
import { cn } from '@/lib/utils'
import { CommentItemProps } from '@/types/comment'
import Link from 'next/link'
import { useState } from 'react'
import { CommentEditor } from './CommentEditor'
import { CommentTree } from './CommentTree'

export const CommentItem = ({
	isAdmin,
	isAuthorized,
	comment,
	animeId,
	reviewId,
	replyingToId,
	setReplyingToId,
	isRoot = false,
	showAnimeTitle = false,
	allowToggleChildren = false,
}: CommentItemProps) => {
	const [isChildrenHidden, setIsChildrenHidden] = useState(false)
	const hasChildren = comment.children?.length > 0
	const toggleChildrenVisibility = () => setIsChildrenHidden(!isChildrenHidden)
	const deleteMutation = useDeleteComment()
	const handleDelete = () => deleteMutation.mutate(comment.id)

	const effectiveAnimeId = 'animeId' in comment ? comment.animeId : animeId

	return (
		<li className={cn(isRoot && 'mb-2', !isRoot && 'ml-4 pl-4 border-l-2')}>
			<div className={'p-4 rounded-lg' + (!isRoot ? 'p-2' : '')}>
				{showAnimeTitle && 'animeTitle' in comment && (
					<Link href={`/anime/${animeId}`} className="text-lg font-medium mb-2">
						{comment.animeTitle}
					</Link>
				)}
				<div className="flex gap-2">
					<p className="font-semibold">{comment.userName}</p>
					<p>{useTimeAgo(comment.createdAt)}</p>
				</div>
				<p>{comment.text}</p>
				<div>
					<Button variant="link" className="text-sm" onClick={() => setReplyingToId(comment.id)} disabled={!isAuthorized}>
						Ответить
					</Button>
					{isAdmin && (
						<Button variant="link" className="text-sm" onClick={handleDelete}>
							Удалить
						</Button>
					)}
					{allowToggleChildren && isRoot && hasChildren && (
						<Button variant="link" className="text-sm" onClick={toggleChildrenVisibility}>
							{isChildrenHidden ? 'Показать комментарии' : 'Скрыть комментарии'}
						</Button>
					)}
				</div>
				{replyingToId === comment.id && <CommentEditor animeId={effectiveAnimeId} reviewId={reviewId} parentId={comment.id} onCancel={() => setReplyingToId(null)} />}
			</div>
			{hasChildren && !isChildrenHidden && (
				<CommentTree
					isAdmin={isAdmin}
					isAuthorized={isAuthorized}
					comments={comment.children}
					animeId={effectiveAnimeId}
					reviewId={reviewId}
					isRoot={false}
					allowToggleChildren={allowToggleChildren}
				/>
			)}
		</li>
	)
}
