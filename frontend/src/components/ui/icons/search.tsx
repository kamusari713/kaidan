import { IconProps } from '@/types/ui'
import React, { FC } from 'react'
import { BaseIcon } from './base-icon'

export const Search: FC<IconProps> = ({ className = 'stroke-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<circle cx="11" cy="11" r="8" />
			<path d="m21 21-4.3-4.3" />
		</BaseIcon>
	)
}
