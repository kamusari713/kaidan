import { useVoteForReview } from '@/shared/hooks/review'
import { Review, ReviewVote } from '@/shared/types/anime-page/review'
import { UserCredentials } from '@/shared/types/auth'
import { useQueryClient } from '@tanstack/react-query'
import { Button, ThumbsDown, ThumbsUp } from '@/shared/components/ui'

export const ReviewCard = ({ review }: { review: Review }) => {
	const queryClient = useQueryClient()
	const user = queryClient.getQueryData<UserCredentials>(['auth'])
	const { mutate: vote } = useVoteForReview(review.animeId)

	const handleVote = (reviewVote: ReviewVote) => {
		if (!user) return
		vote({ reviewId: review.id, userId: user.id, vote: reviewVote })
	}

	return (
		<div className="p-4 border rounded bg-background shadow-sm">
			<div className="text-sm">
				<b> {review.userName} </b>оценил на {review.score}/10
			</div>
			<p className="mt-1">{review.text}</p>

			<div className="flex gap-2 mt-3">
				<Button variant="outline" onClick={() => handleVote('LIKE')} className={`hover:bg-green px-3 py-1 rounded ${review.userVote === 'LIKE' ? 'bg-green-600 text-foreground' : ''}`}>
					<ThumbsUp /> {review.likes}
				</Button>
				<Button variant="outline" onClick={() => handleVote('DISLIKE')} className={`hover:bg-red-600 px-3 py-1 rounded ${review.userVote === 'DISLIKE' ? 'bg-red-600 text-foreground' : ''}`}>
					<ThumbsDown /> {review.dislikes}
				</Button>
			</div>
		</div>
	)
}
