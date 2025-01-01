import React from 'react'
import { Container } from './container'

export const Footer: React.FC = () => {
	return (
		<Container className="flex justify-between items-end text-[16px] p-4 bg-card border border-b-0 shadow rounded-xl rounded-b-none">
			<div className="flex flex-col">
				<div>Обращайтесь на почту manfigy@mail.ru</div>
				<div>Этот проект создан исключительно в образовательных целях. Вдохновлён дизайном [anilib.me]</div>
			</div>
			<div>©2024 KAIDAN</div>
		</Container>
	)
}
