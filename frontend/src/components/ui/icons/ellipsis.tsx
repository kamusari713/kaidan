import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const Ellipsis: FC<IconProps> = ({ className = 'stroke-foreground fill-foreground', size = 16 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<circle cx="12" cy="12" r="1" />
			<circle cx="19" cy="12" r="1" />
			<circle cx="5" cy="12" r="1" />
		</BaseIcon>
	)
}
