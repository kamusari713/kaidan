import React from 'react'

export const SectionLatestUpdates: React.FC = () => {
	return (
		<div className="flex gap-4 p-4 mt-10 bg-card rounded-xl overflow-x-auto border shadow">
			{Array.from({ length: 10 }, (_, index) => (
				<div key={index} className="group/item hover:cursor-pointer p-2">
					<div className="w-[200px] aspect-[8/12] bg-accent rounded-xl"></div>
					<div className="group-hover/item:text-accent font-bold line-clamp-2">Противостоящий небесам</div>
					<div className="text-foreground/60">ONA</div>
				</div>
			))}
		</div>
	)
}
