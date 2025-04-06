export interface Comment {
	id: string
	text: string
	userId: string
	animeId?: string
	reviewId?: string
	userName: string
	parentId: string | null
	createdAt: string
	children: Comment[]
}

export type NewComment = Omit<Comment, 'id' | 'children'>
