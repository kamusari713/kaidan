import { Input } from '@/shared/components/ui'
import React from 'react'

export const CommentsCardSection: React.FC = () => {
	return (
		<div className="flex-grow">
			<Input placeholder="Фильтр по тексту" />
		</div>
	)
}
