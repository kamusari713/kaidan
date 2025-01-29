import { FC, PropsWithChildren } from 'react'

export const FormErrorMessage: FC<PropsWithChildren> = ({ children }) => {
	return <p className="text-red-500 text-[14px] ml-2 mb-2">{children}</p>
}
