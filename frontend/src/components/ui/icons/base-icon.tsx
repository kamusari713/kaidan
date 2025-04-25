import { BaseIconProps } from '@/types/ui'
import { FC } from 'react'

export const BaseIcon: FC<Partial<BaseIconProps>> = ({ size = 24, className = '', children, ...props }) => {
	return (
		<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className={className} {...props}>
			{children}
		</svg>
	)
}
