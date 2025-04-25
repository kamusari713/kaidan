import { Footer, Header } from '@/components/layout'
import { ReactNode } from 'react'

const HomeLayout = ({
	children,
}: Readonly<{
	children: ReactNode
}>) => {
	return (
		<div className="flex flex-col w-full min-h-screen gap-6">
			<Header />
			<div className="flex-grow">{children}</div>
			<Footer />
		</div>
	)
}

export default HomeLayout
