import { IconProps } from '@/types/ui'
import { FC } from 'react'
import { BaseIcon } from './base-icon'

export const ArrowLeft: FC<IconProps> = ({ className, size=20 }: IconProps) => {
    return (
        <BaseIcon className={className} size={size}>
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
        </BaseIcon>
    )
}
