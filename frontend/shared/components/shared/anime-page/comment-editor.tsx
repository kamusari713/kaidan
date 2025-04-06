import { Button, Textarea } from '@/shared/components/ui'
import { useAddComment } from '@/shared/hooks/comments'
import { UserCredentials } from '@/shared/types/auth'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'
import { NotAuthenticated } from '@/shared/components/shared/layout/not-authenticated'

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
	const user = queryClient.getQueryData<UserCredentials>(['auth'])
	const { mutate, isPending } = useAddComment()

	const validate = (text: string) => {
		if (!text.trim()) return 'Комментарий не может быть пустым'
		if (text.length < 5) return 'Слишком короткий'
		if (text.length > 500) return 'Слишком длинный'
		return null
	}

	const handleSubmit = () => {
		if (!user) return
		const val = validate(text)
		if (val) return setError(val)

		mutate({
			text,
			userId: user.id,
			userName: user.username,
			animeId,
			reviewId,
			parentId,
			createdAt: new Date().toISOString(),
		})

		setText('')
		setError(null)
		onSuccess?.()
		onCancel?.()
	}

	return (
		<>
			{user?.id ? (
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
