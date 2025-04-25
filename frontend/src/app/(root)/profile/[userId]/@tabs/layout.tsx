import { ReactNode } from 'react'

const TabsLayout = ({ children }: { children: ReactNode }) => {
	return <div className="flex w-full">{children}</div>
}

export default TabsLayout
