import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const MessagesSquare: FC<IconProps> = ({ className = 'stroke-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M14 9a2 2 0 0 1-2 2H6l-4 4V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2z" />
			<path d="M18 9h2a2 2 0 0 1 2 2v11l-4-4h-6a2 2 0 0 1-2-2v-1" />
		</BaseIcon>
	)
}
