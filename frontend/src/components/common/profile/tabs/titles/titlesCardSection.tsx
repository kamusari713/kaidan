import { Input } from '@/src/components/ui'
import { Ellipsis } from '@/src/components/ui/icons'
import React from 'react'

const tabCards: Record<string, { title?: string; watched?: string; date?: string }[]> = {
	Все: [
		{
			title: 'Вечная воля 3',
			watched: '10',
			date: '01.01.2025',
		},
		{
			title: 'Ван пис',
			watched: '100',
			date: '01.01.2025',
		},
	],
	Смотрю: [
		{
			title: 'Вечная воля 3',
			watched: '10',
			date: '01.01.2025',
		},
		{
			title: 'Ван пис',
			watched: '100',
			date: '01.01.2025',
		},
	],
	Запланированно: [],
	Брошено: [],
	Посмотренно: [],
}

interface Props {
	tab: string
}

export const TitlesCardSection: React.FC<Props> = ({ tab }) => {
	return (
		<div className="flex flex-col flex-grow gap-6">
			<Input type="text" placeholder="Фильтр по названию" />
			<div className="min-h-[140px] p-2 bg-card border shadow rounded-xl">
				{tabCards[tab][0] ? (
					tabCards[tab].map((item, index) => (
						<div className="flex p-4 gap-4" key={index}>
							<div className="bg-accent w-[62px] aspect-[10/14] rounded-xl"></div>
							<div className="flex flex-grow items-center">
								<div className="flex flex-col gap-4 w-8/12">
									<div className="text-[15px]">{item.title}</div>
									<div className="text-[13px] text-foreground/60">Продолжить {item.watched} / 100</div>
								</div>
								<div className="flex items-center flex-grow">
									<div className="w-1/2">
										<div className="text-[13px] text-foreground/60">Добавлено</div>
										<div className="text-[13px]">{item.date}</div>
									</div>
									<div className="flex justify-center w-1/2">
										<div className="group/item hover:cursor-pointer hover:bg-accent/20 p-3 rounded-xl">
											<Ellipsis />
										</div>
									</div>
								</div>
							</div>
						</div>
					))
				) : (
					<div className="flex h-full items-center justify-center text-foreground/60">В этом списке пока нет тайтлов</div>
				)}
			</div>
		</div>
	)
}
