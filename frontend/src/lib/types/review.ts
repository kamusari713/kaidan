export type ReviewVote = 'LIKE' | 'DISLIKE'

export interface ReviewVoteDTO {
	userId: string
	reviewId: string
	vote: ReviewVote
}

export interface Review {
	id: string
	animeId: string
	userId: string
	userName: string
	text: string
	score: number
	createdAt: string
	likes: number
	dislikes: number
	userVote?: ReviewVote | null
}

export type NewReview = Omit<Review, 'id' | 'likes' | 'dislikes' | 'myVote'>
