import { cn } from '@/shared/lib/utils'
import { IconProps } from '@/shared/types'
import { FC } from 'react'

export const ArrowRight: FC<IconProps> = ({ className }: IconProps) => {
	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			width="20"
			height="20"
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			stroke-width="1.2"
			stroke-linecap="round"
			stroke-linejoin="round"
			className={cn(' ', className)}
		>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</svg>
	)
}

export default ArrowRight
