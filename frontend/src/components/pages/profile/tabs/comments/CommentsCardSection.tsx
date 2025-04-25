'use client'

import { CommentTree } from '@/components/common/comments'
import { Card, CardContent, Input } from '@/components/ui'
import { useAuthorize } from '@/hooks/authentication'
import { useUserComments } from '@/hooks/profile'
import { useParams } from 'next/navigation'
import { FC, useState } from 'react'

export const CommentsCardSection: FC = () => {
	const params = useParams()
	const userId = params?.userId as string
	const { userData, isAdmin } = useAuthorize()
	const { commentsData } = useUserComments(userId)
	const [filter, setFilter] = useState('')

	const filteredComments = commentsData?.filter((comment) => comment.text.toLowerCase().includes(filter.toLowerCase())) || []

	return (
		<div className="flex flex-col gap-6 flex-grow">
			<Input placeholder="Фильтр по тексту" value={filter} onChange={(e) => setFilter(e.target.value)} className="border p-2 rounded" />

			<Card>
				<CardContent className="p-4">
					<h2 className="font-bold text-xl">{userData && !filter ? 'Ваши комментарии:' : !userData && !filter ? 'Комментарии пользователя:' : ''}</h2>
					{filteredComments.length > 0 ? (
						<CommentTree isAdmin={isAdmin} isAuthorized={!!userData} comments={filteredComments} isRoot={true} showAnimeTitle={true} allowToggleChildren={true} />
					) : (
						<div className="flex h-full items-center justify-center text-foreground/60">{filter ? 'Ничего не найдено' : 'Нет комментариев'}</div>
					)}
				</CardContent>
			</Card>
		</div>
	)
}
