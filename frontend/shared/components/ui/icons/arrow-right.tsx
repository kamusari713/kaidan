import { IconProps } from '@/shared/types'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const ArrowRight: FC<IconProps> = ({ className }: IconProps) => {
	return (
		<BaseIcon className={className} size={20}>
			<path d="M5 12h14" />
			<path d="m12 5 7 7-7 7" />
		</BaseIcon>
	)
}

export default ArrowRight
