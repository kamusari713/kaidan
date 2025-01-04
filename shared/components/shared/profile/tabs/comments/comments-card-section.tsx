import { Input } from '@/shared/components/ui'
import React from 'react'

export const CommentsCardSection: React.FC = () => {
	return (
		<div className="flex flex-col gap-6 flex-grow">
			<Input placeholder="Фильтр по тексту" />
			<div className="min-h-[140px] p-2 bg-card border shadow rounded-xl">
				<div className="flex h-full items-center justify-center text-foreground/60">Нет комментариев</div>
			</div>
		</div>
	)
}
