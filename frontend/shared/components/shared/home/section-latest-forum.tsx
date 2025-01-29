import { ArrowRight, MessagesSquare } from '@/shared/components/ui/icons'
import React from 'react'

export const SectionLatestForum: React.FC = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="group/forum hover:cursor-pointer flex items-center gap-2 ml-4 w-fit">
				<div className="group-hover/forum:text-accent">Последние темы форума</div>
				<ArrowRight className="group-hover/forum:stroke-accent stroke-foreground" size={16} />
			</div>
			<div className="bg-card rounded-xl px-4 py-3 border shadow">
				<div className="flex flex-col gap-2">
					{Array.from({ length: 5 }, (_, index) => (
						<div className="flex justify-between" key={index}>
							<div className="hover:cursor-pointer hover:underline hover:text-accent">Срочно разыскиваем новых сырников! Есть обучение</div>
							<div className="flex items-center gap-2 text-foreground/60">
								<MessagesSquare className="stroke-foreground/60" size={12} />0
							</div>
						</div>
					))}
				</div>
			</div>
		</div>
	)
}
