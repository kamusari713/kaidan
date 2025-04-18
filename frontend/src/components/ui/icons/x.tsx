import { IconProps } from '@/src/lib/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const X: FC<IconProps> = ({ className = 'stroke-foreground', size = 20 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M18 6 6 18" />
			<path d="m6 6 12 12" />
		</BaseIcon>
	)
}
