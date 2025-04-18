'use client'

import { CommentEditor, CommentTree } from '@/src/components/common/animePage'
import { useAnimeComments } from '@/src/hooks/comments'
import { FC } from 'react'

interface Props {
	animeId: string
}

export const AnimeCommentsTab: FC<Props> = ({ animeId }) => {
	const { data: animeData, isLoading, error } = useAnimeComments(animeId)

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>
	if (!animeData) return <p>No data</p>

	return (
		<div className="flex flex-col">
			<CommentEditor animeId={animeId} parentId={null} />
			<CommentTree comments={animeData} animeId={animeId} />
		</div>
	)
}
