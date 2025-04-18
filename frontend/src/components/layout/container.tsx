import { UiComponentProps } from '@/src/lib/types/ui'
import { cn } from '@/src/lib/utils'
import { FC } from 'react'

export const Container: FC<UiComponentProps> = ({ className, children }) => {
	return <div className={cn('mx-auto max-w-[1280px] w-full', className)}>{children}</div>
}
