import { IconProps } from '@/src/lib/types/ui'
import React, { FC } from 'react'
import { BaseIcon } from './base-icon'

export const Plus: FC<IconProps> = ({ className = 'stroke-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M5 12h14" />
			<path d="M12 5v14" />
		</BaseIcon>
	)
}
