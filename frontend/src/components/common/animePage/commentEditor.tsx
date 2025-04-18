import { NotAuthenticated } from '@/src/components/layout/notAuthenticated'
import { Button, Textarea } from '@/src/components/ui'
import { useComment } from '@/src/hooks/comments'
import { UserCredentials } from '@/src/lib/types/authentication'
import { NewComment } from '@/src/lib/types/comments'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

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

		commentMutation({
			text,
			userId: userData.id,
			userName: userData.username,
			animeId,
			reviewId,
			parentId,
			createdAt: new Date().toISOString(),
		} as NewComment)

		setText('')
		setError(null)
		onSuccess?.()
		onCancel?.()
	}

	return (
		<>
			{userData?.id ? (
				<div className="mt-2 flex flex-col gap-2">
					<Textarea value={text} onChange={(e) => setText(e.target.value)} placeholder="Ваш ответ..." className="w-full border p-2 rounded resize-none" rows={3} />
					{error && <p className="text-sm text-red-500">{error}</p>}
					<div className="flex gap-2">
						<Button onClick={handleSubmit} disabled={isPending}>
							{isPending ? 'Отправка...' : 'Отправить'}
						</Button>
						{onCancel && (
							<Button variant="ghost" onClick={onCancel}>
								Отмена
							</Button>
						)}
					</div>
				</div>
			) : (
				<NotAuthenticated />
			)}
		</>
	)
}
