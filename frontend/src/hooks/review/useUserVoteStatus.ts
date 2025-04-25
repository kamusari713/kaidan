import { ReviewVote } from '@/types/review'

export const useUserVoteStatus = (userVote?: ReviewVote | null) => {
	const likeClassName = userVote === 'LIKE' ? 'bg-green-600 text-foreground' : ''
	const dislikeClassName = userVote === 'DISLIKE' ? 'bg-red-600 text-foreground' : ''
	return { likeClassName, dislikeClassName }
}
