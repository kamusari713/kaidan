import { Button, Card, CardContent, ReviewStatusIcon, ThumbsDown, ThumbsUp } from '@/components/ui'
import { useUserVoteStatus, useVoteForReview } from '@/hooks/review'
import { useDisplayName } from '@/hooks/utils'
import { ReviewStatusLabels } from '@/lib/constants'
import { Review, ReviewProfileDTO, ReviewStatus, ReviewVote } from '@/types/review'
import { UserCredentials } from '@/types/user'
import { useQueryClient } from '@tanstack/react-query'
import Link from 'next/link'

interface ReviewCardProps {
	review: Review | ReviewProfileDTO
	animeId?: string
	linkToAnime?: boolean
	linkToUser?: boolean
}

export const ReviewCard = ({ review, animeId, linkToAnime = false, linkToUser = false }: ReviewCardProps) => {
	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	const effectiveAnimeId = 'animeId' in review ? review.animeId : animeId

	const { mutate: voteMutation } = effectiveAnimeId ? useVoteForReview(effectiveAnimeId) : { mutate: () => {} }
	const { likeClassName, dislikeClassName } = 'userVote' in review ? useUserVoteStatus(review.userVote) : { likeClassName: '', dislikeClassName: '' }

	const reviewStatusClassName = `${review.status === 'POSITIVE' ? 'text-green-600' : review.status === 'NEGATIVE' ? 'text-red-600' : ''}`
	const status = useDisplayName<ReviewStatus>({ status: review.status, labels: ReviewStatusLabels })

	const handleVote = (reviewVote: ReviewVote) => {
		if (!userData || !effectiveAnimeId) return
		voteMutation({ reviewId: review.id, userId: userData.id, vote: reviewVote })
	}

	const userId = 'userId' in review ? review.userId : undefined
	const score = 'score' in review ? review.score : undefined
	const dislikes = 'dislikes' in review ? review.dislikes : undefined

	return (
		<Card>
			<CardContent className="flex flex-col gap-2 p-4 rounded">
				<h1 className="font-bold">{linkToAnime && effectiveAnimeId ? <Link href={`/anime/${effectiveAnimeId}`}>{review.animeName}</Link> : null}</h1>
				<h2 className="font-bold">{review.title}</h2>
				<div>
					<p className="flex gap-2 text-sm">
						{linkToUser && userId ? (
							<Link href={`/profile/${userId}/reviews`}>
								<span className="font-medium">{review.userName}</span>
							</Link>
						) : (
							<span className="font-medium">{review.userName}</span>
						)}
						{score !== undefined && ` оценил на ${score}/10`}
						<ReviewStatusIcon status={review.status} />
						<span className={reviewStatusClassName}>{status}</span>
					</p>
					<p>{review.text}</p>
				</div>
				<div className="flex gap-2 mt-3">
					<Button
						disabled={!userData}
						variant="outline"
						onClick={() => handleVote('LIKE')}
						className={`hover:bg-green-600 text-foreground hover:text-foreground px-3 py-1 rounded ${likeClassName}`}
					>
						<ThumbsUp /> {review.likes}
					</Button>
					<Button
						disabled={!userData}
						variant="outline"
						onClick={() => handleVote('DISLIKE')}
						className={`hover:bg-red-600 text-foreground hover:text-foreground px-3 py-1 rounded ${dislikeClassName}`}
					>
						<ThumbsDown /> {dislikes}
					</Button>
				</div>
			</CardContent>
		</Card>
	)
}
