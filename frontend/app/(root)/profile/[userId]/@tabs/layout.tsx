import { ReactNode } from 'react'

export default function TabsLayout({ children }: { children: ReactNode }) {
	return <div className="flex w-full gap-10">{children}</div>
}
