import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const User: FC<IconProps> = ({ className = 'stroke-foreground fill-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
			<circle cx="12" cy="7" r="4" />
		</BaseIcon>
	)
}
