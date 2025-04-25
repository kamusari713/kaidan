'use client'

import { Button, Textarea } from '@/components/ui'
import { useComment } from '@/hooks/comments'
import { NewComment } from '@/types/comment'
import { UserCredentials } from '@/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { NotAuthenticated } from '@/components/layout'

interface Props {
	animeId?: string
	reviewId?: string
	parentId: string | null
	onCancel?: () => void
	onSuccess?: () => void
}

export const CommentEditor = ({ animeId, reviewId, parentId, onCancel, onSuccess }: Props) => {
	const [text, setText] = useState('')
	const [error, setError] = useState<string | null>(null)
	const [isExpanded, setIsExpanded] = useState(parentId !== null)

	const queryClient = useQueryClient()
	const userData = queryClient.getQueryData<UserCredentials>(['auth'])

	const { mutate: commentMutation, isPending } = useComment()

	const validate = (text: string) => {
		if (!text.trim()) return 'Комментарий не может быть пустым'
		if (text.length < 5) return 'Слишком короткий'
		if (text.length > 500) return 'Слишком длинный'
		return null
	}

	const handleSubmit = () => {
		if (!userData) return
		const val = validate(text)
		if (val) return setError(val)

		commentMutation(
			{
				text,
				userId: userData.id,
				userName: userData.username,
				animeId,
				reviewId,
				parentId,
				createdAt: new Date().toISOString(),
			} as NewComment,
			{
				onSuccess: () => {
					setText('')
					setError(null)
					setIsExpanded(false)
					onSuccess?.()
					onCancel?.()
				},
			}
		)
	}

	return (
		<div className="mt-2 flex flex-col gap-2">
			<Textarea
				className={`w-full border p-2 pr-24 rounded resize-none ${isPending || !userData ? 'hidden' : ''}`}
				value={text}
				onChange={(e) => setText(e.target.value)}
				placeholder="Ваш комментарий..."
				rows={isExpanded ? 3 : 1}
				onFocus={() => userData && !isExpanded && setIsExpanded(true)}
			/>
			{isExpanded && (
				<>
					{error && <p className="text-sm text-red-500">{error}</p>}
					<div className="flex gap-2">
						<Button onClick={handleSubmit} disabled={isPending || !userData}>
							{isPending ? 'Отправка...' : 'Отправить'}
						</Button>
						<Button
							variant="ghost"
							onClick={() => {
								setIsExpanded(false)
								setText('')
								setError(null)
								onCancel?.()
							}}
						>
							Отмена
						</Button>
					</div>
				</>
			)}
			{!userData && <NotAuthenticated />}
		</div>
	)
}
