import { IconProps } from '@/src/lib/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const Sun: FC<IconProps> = ({ className = 'stroke-foreground fill-foreground', size = 5 }) => {
	return (
		<BaseIcon className={className} size={size}>
			<circle cx="12" cy="12" r="4" />
			<path d="M12 2v2" />
			<path d="M12 20v2" />
			<path d="m4.93 4.93 1.41 1.41" />
			<path d="m17.66 17.66 1.41 1.41" />
			<path d="M2 12h2" />
			<path d="M20 12h2" />
			<path d="m6.34 17.66-1.41 1.41" />
			<path d="m19.07 4.93-1.41 1.41" />
		</BaseIcon>
	)
}
