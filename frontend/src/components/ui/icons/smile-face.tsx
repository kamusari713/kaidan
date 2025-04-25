import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const SmileFace: FC<IconProps> = ({ className = 'stroke-green-600', size }) => {
    return (
        <BaseIcon className={className} size={size}>
            <circle cx="12" cy="12" r="10" />
            <path d="M8 14s1.5 2 4 2 4-2 4-2" />
            <line x1="9" x2="9.01" y1="9" y2="9" />
            <line x1="15" x2="15.01" y1="9" y2="9" />
        </BaseIcon>
    )
}
