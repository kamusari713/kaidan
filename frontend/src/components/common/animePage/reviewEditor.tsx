import { Button, Input, Label, Textarea } from '@/src/components/ui'
import { useReview } from '@/src/hooks/review'
import { UserCredentials } from '@/src/lib/types/authentication'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const ReviewEditor = ({ animeId }: { animeId: string }) => {
	const [text, setText] = useState('')
	const [score, setScore] = useState(10)
	const [error, setError] = useState<string | null>(null)

	const queryClient = useQueryClient()
	const user = queryClient.getQueryData<UserCredentials>(['auth'])

	const { mutate: reviewMutation, isPending } = useReview(animeId)

	const validate = () => {
		if (!text.trim()) return 'Текст не может быть пустым'
		if (score < 1 || score > 10) return 'Оценка должна быть от 1 до 10'
		return null
	}

	const handleSubmit = () => {
		const val = validate()
		if (val) return setError(val)
		if (!user) return

		reviewMutation({
			animeId,
			userId: user.id,
			userName: user.username,
			text,
			score,
			createdAt: new Date().toISOString(),
		})

		setText('')
		setScore(10)
		setError(null)
	}

	return (
		<div className="p-4 border rounded bg-background shadow-sm flex flex-col gap-3">
			<Label className="text-sm font-medium">Оценка (1–10):</Label>
			<Input type="number" min={1} max={10} value={score} onChange={(e) => setScore(Number(e.target.value))} className="border p-2 rounded w-20" />

			<Textarea placeholder="Оставьте отзыв..." value={text} onChange={(e) => setText(e.target.value)} className="border p-2 rounded w-full" rows={4} />

			{error && <p className="text-sm text-red-500">{error}</p>}

			<Button onClick={handleSubmit} disabled={isPending} className="self-start bg-primary text-white px-4 py-2 rounded">
				{isPending ? 'Отправка...' : 'Оставить отзыв'}
			</Button>
		</div>
	)
}
