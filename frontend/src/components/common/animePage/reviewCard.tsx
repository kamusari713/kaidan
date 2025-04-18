import { Button, ThumbsDown, ThumbsUp } from '@/src/components/ui'
import { useVoteForReview } from '@/src/hooks/review'
import { UserCredentials } from '@/src/lib/types/authentication'
import { Review, ReviewVote } from '@/src/lib/types/review'
import { useQueryClient } from '@tanstack/react-query'

export const ReviewCard = ({ review }: { review: Review }) => {
	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	const { mutate: voteMutation } = useVoteForReview(review.animeId)

	const handleVote = (reviewVote: ReviewVote) => {
		if (!userData) return
		voteMutation({ reviewId: review.id, userId: userData.id, vote: reviewVote })
	}

	return (
		<div className="p-4 border rounded bg-background shadow-sm">
			<div className="text-sm">
				<b> {review.userName} </b>оценил на {review.score}/10
			</div>
			<p className="mt-1">{review.text}</p>

			<div className="flex gap-2 mt-3">
				<Button
					disabled={!userData}
					variant="outline"
					onClick={() => handleVote('LIKE')}
					className={`hover:bg-green-600 text-foreground hover:text-foreground px-3 py-1 rounded ${review.userVote === 'LIKE' ? 'bg-green-600 text-foreground' : ''}`}
				>
					<ThumbsUp /> {review.likes}
				</Button>
				<Button
					disabled={!userData}
					variant="outline"
					onClick={() => handleVote('DISLIKE')}
					className={`hover:bg-red-600 text-foreground hover:text-foreground px-3 py-1 rounded ${review.userVote === 'DISLIKE' ? 'bg-red-600 text-foreground' : ''}`}
				>
					<ThumbsDown /> {review.dislikes}
				</Button>
			</div>
		</div>
	)
}
