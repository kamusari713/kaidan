'use client'

import { FC } from 'react'
import { useAnimeComments } from '@/shared/hooks/comments'
import { AnimePageTabProps } from '@/shared/types/anime-page/props'
import { CommentTree, CommentEditor } from '../'

export const AnimeCommentsTab: FC<AnimePageTabProps> = ({ animeId }) => {
	const { data, isLoading, error } = useAnimeComments(animeId)

	if (isLoading) return <p>Loading...</p>
	if (error) return <p>Error : {error.message}</p>
	if (!data) return <p>No data</p>

	return (
		<div className="flex flex-col">
			<CommentEditor animeId={animeId} parentId={null} />
			<CommentTree comments={data} animeId={animeId} />
		</div>
	)
}
