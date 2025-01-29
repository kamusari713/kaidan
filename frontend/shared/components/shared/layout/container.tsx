import { cn } from '@/shared/lib/utils'
import { UiComponentProps } from '@/shared/types'
import { FC } from 'react'

export const Container: FC<UiComponentProps> = ({ className, children }) => {
	return <div className={cn('mx-auto max-w-[1280px] w-full', className)}>{children}</div>
}
