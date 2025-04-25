import { Button, Card, CardContent, Input, Label, Textarea } from '@/components/ui'
import { useReview } from '@/hooks/review'
import { UserCredentials } from '@/types/user'
import { useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'

export const ReviewEditor = ({ animeId }: { animeId: string }) => {
	const [text, setText] = useState('')
	const [title, setTitle] = useState('')
	const [score, setScore] = useState(10)
	const [error, setError] = useState<string | null>(null)

	const queryClient = useQueryClient()
	const user = queryClient.getQueryData<UserCredentials>(['auth'])

	const { mutate: reviewMutation, isPending } = useReview(animeId)

	const validate = () => {
		if (!text.trim()) return 'Текст не может быть пустым'
		if (!title.trim()) return 'Название не может быть пустым'
		if (score < 0 || score > 10) return 'Оценка должна быть от 0 до 10'
		return null
	}

	const handleSubmit = () => {
		const val = validate()
		if (val) return setError(val)
		if (!user) return

		reviewMutation({
			title: title.trim(),
			animeId,
			userId: user.id,
			userName: user.username,
			text: text.trim(),
			score,
			createdAt: new Date().toISOString(),
		})

		setText('')
		setScore(10)
		setError(null)
	}

	return (
		<Card>
			<CardContent className="p-4 rounded flex flex-col gap-3">
				<div className="flex gap-10">
					<div className="flex flex-col gap-2">
						<Label className="text-sm font-medium">Оценка (0–10):</Label>
						<Input className="bg-card p-2 rounded w-20" type="number" min={0} max={10} value={score} onChange={(e) => setScore(Number(e.target.value))} />
					</div>
					<div>
						<Label className="text-sm font-medium">Название:</Label>
						<Input className="bg-card p-2 rounded w-96" type="text" placeholder="Название отзыва" value={title} onChange={(e) => setTitle(e.target.value)} />
					</div>
				</div>

				<Textarea placeholder="Оставьте отзыв..." value={text} onChange={(e) => setText(e.target.value)} className="bg-card p-2 rounded w-full" rows={4} />

				{error && <p className="text-sm text-red-500">{error}</p>}

				<Button onClick={handleSubmit} disabled={isPending} className="self-start text-white px-4 py-2 rounded">
					{isPending ? 'Отправка...' : 'Оставить отзыв'}
				</Button>
			</CardContent>
		</Card>
	)
}
