import { AnimeListStatus, AuthResponse, LoginData, RegisterData, UserCredentials } from '@/shared/types'
import { apiClient } from './api-client'
import { Comment, NewComment } from '@/shared/types/anime-page/comments'
import { NewReview, Review, ReviewVoteDTO } from '@/shared/types/anime-page/review'
import { UserAnimeList } from '@/shared/types/anime'
import { UserProfile } from '@/shared/types/profile'

export async function getUserReviews(userId: string): Promise<Review[]> {
	const response = await apiClient.get<Review[]>(`/public/user/profile/reviews/${userId}`)
	return response.data
}

export async function getUserCommens(userId: string): Promise<Comment[]> {
	const response = await apiClient.get<Comment[]>(`/public/user/profile/comments/${userId}`)
	return response.data
}

export async function getUserAnimeList(userId: string): Promise<UserAnimeList[]> {
	const response = await apiClient.get<UserAnimeList[]>(`/public/user/profile/anime-lists/${userId}`)
	return response.data
}

export async function getProfile(userId: string): Promise<UserProfile> {
	const response = await apiClient.get<UserProfile>('/public/user/profile', { params: { userId } })
	return response.data
}

export async function updateUserBio(userId: string, newBio: string): Promise<UserProfile> {
	const response = await apiClient.post<UserProfile>('/public/user/profile/bio', { userId, newBio })
	return response.data
}

export async function updateUsername(userId: string): Promise<UserProfile> {
	const response = await apiClient.post<UserProfile>('/public/user/profile/username', { userId })
	return response.data
}

export async function getAnimeStatus(animeId: string): Promise<AnimeListStatus | null> {
	const response = await apiClient.get<AnimeListStatus | null>('/public/user/anime-list/status', { params: { animeId } })
	if (response.status === 204) return null
	return response.data as AnimeListStatus
}

export async function addToList(animeId: string, status: AnimeListStatus): Promise<UserAnimeList> {
	const response = await apiClient.post('/public/user/anime-list', { animeId, status })
	return response.data
}

export async function removeFromList(animeId: string): Promise<UserAnimeList> {
	const response = await apiClient.delete<UserAnimeList>('/public/user/anime-list', { params: { animeId } })
	return response.data
}

export async function addReviewVote(vote: ReviewVoteDTO): Promise<Review> {
	const response = await apiClient.post<Review>('/public/review/vote', vote)
	return response.data
}

export async function addReview(review: NewReview): Promise<Review> {
	const response = await apiClient.post<Review>('/public/review/new', review)
	return response.data
}

export async function addComment(comment: NewComment): Promise<Comment> {
	const response = await apiClient.post<Comment>('/public/comment/new', comment)
	return response.data
}

export async function getReviewComments(reviewId: string): Promise<Comment[]> {
	const response = await apiClient.get<Comment[]>(`/public/comment/review/${reviewId}`)
	return response.data
}

export async function getAnimeReviews(animeId: string): Promise<Review[]> {
	const response = await apiClient.get<Review[]>(`/public/review/anime/${animeId}`)
	return response.data
}

export async function getAnimeComments(animeId: string): Promise<Comment[]> {
	const response = await apiClient.get<Comment[]>(`/public/comment/anime/${animeId}`)
	return response.data
}

export async function login(data: LoginData): Promise<AuthResponse> {
	const response = await apiClient.post<AuthResponse>('/public/auth/login', data)
	return response.data
}

export async function register(data: RegisterData): Promise<AuthResponse> {
	const response = await apiClient.post<AuthResponse>('/public/auth/register', data)
	return response.data
}

export async function logout(): Promise<void> {
	const response = await apiClient.post<void>('/private/auth/logout')
	return response.data
}

export async function me(): Promise<UserCredentials> {
	const response = await apiClient.get<UserCredentials>('/private/auth/me')
	return response.data
}
