import { IconProps } from '@/shared/types'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const Moon: FC<IconProps> = ({ className = 'stroke-foreground fill-foreground', size = 5 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
		</BaseIcon>
	)
}
