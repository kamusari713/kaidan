import { PropsWithChildren, SVGProps } from 'react'

export interface BaseIconProps extends SVGProps<SVGSVGElement> {
	size?: number
	className?: string
}

export interface IconProps {
	size?: number
	className?: string
}

export interface UiComponentProps extends PropsWithChildren {
	className?: string
}
