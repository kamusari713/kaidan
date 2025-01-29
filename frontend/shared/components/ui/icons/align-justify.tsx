import { IconProps } from '@/shared/types'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const AlignJustify: FC<IconProps> = ({ className = 'fill-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M3 12h18" />
			<path d="M3 18h18" />
			<path d="M3 6h18" />
		</BaseIcon>
	)
}
