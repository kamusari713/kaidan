import { AspectRatio, Skeleton } from '@/components/ui'
import { useKodikVideo } from '@/hooks/anime'
import { FC } from 'react'

interface AnimeVideoTabProps {
	animeId: string
	className?: string
}

export const AnimeVideoTab: FC<AnimeVideoTabProps> = ({ animeId, className }) => {
	const { videoData, isPending, error } = useKodikVideo(animeId)

	return (
		<AspectRatio ratio={16 / 9}>
			{!isPending ? (
				<iframe className={className} src={videoData?.link} allow="autoplay *; fullscreen *"></iframe>
			) : (
				<>
					<Skeleton className={className} />
					{!isPending && !videoData ? <h1 className="absolute inset-0 flex items-center justify-center">Video not found</h1> : null}
					{error ? <h1 className="absolute inset-0 flex items-center justify-center">Error: {error.message}</h1> : null}
				</>
			)}
		</AspectRatio>
	)
}
