import { FC } from 'react'
import { Container } from './container'

export const Footer: FC = () => {
	return (
		<div className="w-full bg-card border-t shadow">
			<Container className="flex justify-between items-end text-[16px] p-4">
				<div className="flex flex-col">
					<div>Обращайтесь на почту manfigy@mail.ru</div>
					<div>Этот проект создан исключительно в образовательных целях. Вдохновлён дизайном [anilib.me]</div>
				</div>
				<div>©2025 KAIDAN</div>
			</Container>
		</div>
	)
}
