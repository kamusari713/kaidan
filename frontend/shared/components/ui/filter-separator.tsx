import { cn } from '@/shared/lib/utils'
import React, { ReactNode } from 'react'

interface Props {
	children?: ReactNode
	className?: string
}

export const FilterSeparator: React.FC<Props> = ({ children, className }) => {
	return (
		<div className={cn("relative w-full before:block before:content-[''] before:absolute before:top-1/2 before:left-0 before:w-full before:h-[1px] before:bg-border py-3 px-2", className)}>
			<div className="relative bg-card px-2 inline-flex text-foreground/60">{children}</div>
		</div>
	)
}
