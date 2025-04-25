import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const ChevronDown: FC<IconProps> = ({ className = 'stroke-foreground', size = 20 }) => {
    return (
        <BaseIcon className={className} size={size}>
            <path d="m6 9 6 6 6-6" />
        </BaseIcon>
    )
}
