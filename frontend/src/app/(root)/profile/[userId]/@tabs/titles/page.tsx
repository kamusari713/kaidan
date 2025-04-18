'use client'

import { TitlesCardSection } from '@/src/components/common/profile/tabs/titles'
import { Label, RadioGroup, RadioGroupItem, Separator, TitleSeparator } from '@/src/components/ui'
import { useState } from 'react'

const tabs = ['Все', 'Смотрю', 'Запланированно', 'Брошено', 'Посмотренно']

export default function TitlesTab() {
	const [activeTab, setActiveTab] = useState('Все')

	return (
		<div className="flex gap-6 w-full">
			<div className="flex flex-col w-[300px] text-[14px] pb-2 bg-card rounded-xl border shadow">
				<TitleSeparator>Списки</TitleSeparator>
				<div className="flex flex-col gap-2">
					{tabs.map((tab, index) => (
						<div
							className="hover:bg-accent/20 hover:text-accent/60 rounded-xl p-2 mx-2 data-[state=active]:bg-accent/20 data-[state=active]:text-accent/60 text-foreground/60 flex justify-between items-center transition-all duration-200 hover:cursor-pointer"
							data-state={activeTab === tab ? 'active' : 'not-active'}
							onClick={() => setActiveTab(tab)}
							key={index}
						>
							{tab}
							<div data-state={activeTab === tab ? 'active' : 'not-active'} className="data-[state=active]:text-accent/60 text-foreground/60 transition-all duration-200">
								0
							</div>
						</div>
					))}
				</div>
				<TitleSeparator>Сортировка</TitleSeparator>
				<RadioGroup defaultValue="name_az" className="">
					<div className="flex items-center gap-3 px-4 py-2 hover:cursor-pointer">
						<RadioGroupItem value="name_az" id="name_az" />
						<Label className="hover:cursor-pointer" htmlFor="name_az">
							По названию (A-Z)
						</Label>
					</div>
					<div className="flex items-center gap-3 px-4 py-2 hover:cursor-pointer">
						<RadioGroupItem value="name_za" id="name_za" />
						<Label className="hover:cursor-pointer" htmlFor="name_za">
							По названию (Z-A)
						</Label>
					</div>
				</RadioGroup>

				<Separator className="w-auto ml-4 my-2" />

				<RadioGroup defaultValue="desc">
					<div className="flex items-center gap-3 px-4 py-2">
						<RadioGroupItem value="desc" id="desc" />
						<Label className="hover:cursor-pointer" htmlFor="desc">
							По убыванию
						</Label>
					</div>
					<div className="flex items-center gap-3 px-4 py-2">
						<RadioGroupItem value="asc" id="asc" />
						<Label className="hover:cursor-pointer" htmlFor="asc">
							По возрастанию
						</Label>
					</div>
				</RadioGroup>
			</div>

			<TitlesCardSection tab={activeTab} />
		</div>
	)
}
