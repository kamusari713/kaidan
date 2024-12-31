import { ArrowRight, ThumbsUp } from 'lucide-react'
import React from 'react'

export const SectionLatestRatings: React.FC = () => {
	return (
		<div className="flex flex-col gap-2">
			<div className="group/feedbacks hover:cursor-pointer flex items-center gap-2 ml-4">
				<div className="group-hover/feedbacks:text-accent">Последние отзывы</div> <ArrowRight className="group-hover/feedbacks:stroke-accent stroke-foreground" size={16} />
			</div>
			<div className="flex justify-between flex-wrap w-full gap-4">
				{Array.from({ length: 4 }, (_, index) => (
					<div key={index} className="group/feedback-item w-[calc(50%-8px)] bg-card h-fit rounded-xl border shadow hover:cursor-pointer hover:bg-accent/20">
						<div className="bg-accent border rounded-xl rounded-b-none h-[80px]"></div>
						<div className="flex flex-col justify-between">
							<div className="flex flex-col px-4 py-3 gap-2">
								<div className="group-hover/feedback-item:text-accent text-[15px] font-bold">Жаль, что это про религию, а не про астрономию</div>
								<div className="line-clamp-3 text-[14px] text-foreground/60">
									Сериал отличный. Триллер, основанный на исторических событиях. Графика средняя, но в Lorem ipsum dolor sit amet consectetur.
								</div>
							</div>
							<div className="flex justify-between text-[12px] px-4 py-3">
								<div className="flex gap-2 items-center text-foreground/60">
									<ThumbsUp className="stroke-foreground/60" size={14} />0
								</div>
								<div className="text-foreground/60">9 часов назад</div>
							</div>
						</div>
					</div>
				))}
			</div>
		</div>
	)
}
