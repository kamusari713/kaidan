'use client'

import { cn } from '@/lib/utils'
import { CommentTreeProps } from '@/types/comment'
import { useState } from 'react'
import { CommentItem } from './CommentItem'

export const CommentTree = ({ isAdmin, isAuthorized, comments, animeId, reviewId, isRoot = false, showAnimeTitle = false, allowToggleChildren = false }: CommentTreeProps) => {
	const [replyingToId, setReplyingToId] = useState<string | null>(null)

	return (
		<ul className={cn(isRoot && 'bg-card rounded-md')}>
			{comments.map((comment) => (
				<CommentItem
					key={comment.id}
					isAdmin={isAdmin}
					isAuthorized={isAuthorized}
					comment={comment}
					animeId={animeId}
					reviewId={reviewId}
					replyingToId={replyingToId}
					setReplyingToId={setReplyingToId}
					isRoot={isRoot}
					showAnimeTitle={showAnimeTitle}
					allowToggleChildren={allowToggleChildren}
				/>
			))}
		</ul>
	)
}
