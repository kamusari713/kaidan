import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const PokerFace: FC<IconProps> = ({ className = 'stroke-foreground ', size }) => {
    return (
        <BaseIcon className={className} size={size}>
            <circle cx="12" cy="12" r="10" />
            <line x1="8" x2="16" y1="15" y2="15" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </BaseIcon>
    )
}
