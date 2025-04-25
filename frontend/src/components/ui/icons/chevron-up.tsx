import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const ChevronUp: FC<IconProps> = ({ className = 'stroke-foreground', size = 20 }) => {
    return (
        <BaseIcon className={className} size={size}>
            <path d="m18 15-6-6-6 6" />
        </BaseIcon>
    )
}
