import { IconProps } from '@/src/lib/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const List: FC<IconProps> = ({ className = 'stroke-foreground fill-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M3 12h.01" />
			<path d="M3 18h.01" />
			<path d="M3 6h.01" />
			<path d="M8 12h13" />
			<path d="M8 18h13" />
			<path d="M8 6h13" />
		</BaseIcon>
	)
}
