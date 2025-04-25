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

export type CommentCardDTO = {
	id: string
	userId: string
	animeId: string
	animeTitle: string
	createdAt: string
	parentId: string
	reviewId: string
	text: string
	userName: string
	children: CommentCardDTO[]
}

type CommentType = Comment | CommentCardDTO

export interface CommentTreeProps {
	isAdmin: boolean
	isAuthorized: boolean
	comments: CommentType[]
	animeId?: string
	reviewId?: string
	isRoot?: boolean
	showAnimeTitle?: boolean
	allowToggleChildren?: boolean
}

export interface CommentItemProps {
	isAdmin: boolean
	isAuthorized: boolean
	comment: CommentType
	animeId?: string
	reviewId?: string
	replyingToId: string | null
	setReplyingToId: (id: string | null) => void
	isRoot: boolean
	showAnimeTitle: boolean
	allowToggleChildren: boolean
}
