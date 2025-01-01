import { TitlesFilter } from '@/shared/components/shared/profile/tabs'
import { Input } from '@/shared/components/ui'
import { ReactNode } from 'react'

export default function TitlesLayout({ children }: { children: ReactNode }) {
	return (
		<div className="flex w-full gap-6">
			<TitlesFilter />
			<div className="w-full">
				<Input type="text" placeholder="Фильтр по названию" />
				<div>asd</div>
			</div>
		</div>
	)
}
