'use client'

import { CommentEditor, CommentTree } from '@/components/common/comments'
import { useAnimeComments } from '@/hooks/comments'
import { UserCredentials } from '@/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { FC } from 'react'

interface Props {
	animeId: string
}

export const AnimeCommentsTab: FC<Props> = ({ animeId }) => {
	const { commentsData, isLoading, error } = useAnimeComments(animeId)

	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>
	if (!commentsData) return <p>No data</p>

	return (
		<div className="flex flex-col gap-2 p-2">
			<CommentEditor animeId={animeId} parentId={null} />
			<CommentTree isAdmin={userData?.role === "ROLE_ADMIN"} isAuthorized={!!userData} isRoot={true} showAnimeTitle={true} allowToggleChildren={true} comments={commentsData} animeId={animeId} />
			{commentsData?.length === 0 && <p className="text-center text-m text-foreground">Пока что никто не оставил комментарий. Станьте первым, кто поделится впечатлением!</p>}
		</div>
	)
}
