export type ReviewVote = 'LIKE' | 'DISLIKE'

export interface ReviewVoteDTO {
	userId: string
	reviewId: string
	vote: ReviewVote
}

export type ReviewStatus = 'POSITIVE' | 'NEUTRAL' | 'NEGATIVE'

export interface Review {
	id: string
	title: string
	animeId: string
	userId: string
	userName: string
	text: string
	score: number
	createdAt: string
	likes: number
	dislikes: number
	status: ReviewStatus
	userVote?: ReviewVote | null
}

export interface ReviewProfileDTO extends Review {
	animeName: string
}

export interface ReviewCardDTO extends Omit<Review, 'userVote'> {
	animeBanner: string
}

export type NewReview = Omit<Review, 'id' | 'likes' | 'dislikes' | 'myVote' | 'status'>
