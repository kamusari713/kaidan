import { cn } from '@/src/lib/utils'
import { UiComponentProps } from '@/src/lib/types/ui'
import { FC } from 'react'

export const TitleSeparator: FC<UiComponentProps> = ({ children, className }) => {
	return (
		<div className={cn("relative w-full before:block before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-border py-3 px-2", className)}>
			<div className="relative bg-card px-2 inline-flex text-foreground/60">{children}</div>
		</div>
	)
}
