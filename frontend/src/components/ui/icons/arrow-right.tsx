import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const ArrowRight: FC<IconProps> = ({ className, size=20 }: IconProps) => {
	return (
		<BaseIcon className={className} size={size}>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</BaseIcon>
	)
}
