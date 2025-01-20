import { cn } from '@/shared/lib/utils'
import React from 'react'

interface Props {
	className?: string
}

export const Container: React.FC<React.PropsWithChildren<Props>> = ({ className, children }) => {
	return <div className={cn('mx-auto max-w-[1280px] w-full', className)}>{children}</div>
}
