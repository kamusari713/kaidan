import { IconProps } from '@/src/lib/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const MessageCircle: FC<IconProps> = ({ className = 'stroke-foreground fill-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z" />
		</BaseIcon>
	)
}
