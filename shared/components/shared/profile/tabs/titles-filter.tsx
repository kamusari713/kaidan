import { Label, RadioGroup, RadioGroupItem, Separator } from '@/shared/components/ui'
import React from 'react'

export const TitlesFilter: React.FC = () => {
	return (
		<div className="flex flex-col w-[300px] bg-card rounded-xl border shadow">
			<div className="px-4 py-2 text-foreground/60">Списки</div>
			<Separator />
			<div className="py-1">
				{['Все', 'Читаю', 'В планах', 'Брошено', 'Просмотрено'].map((value, index) => (
					<div className="px-4 py-2" key={index}>
						{value}
					</div>
				))}
			</div>
			<Separator />
			<div className="px-4 py-2 text-foreground/60">Сортировка</div>
			<Separator />
			<RadioGroup defaultValue="name_az" className="py-1">
				<div className="flex items-center gap-3 px-4 py-2">
					<RadioGroupItem value="name_az" id="name_az" />
					<Label htmlFor="name_az">По названию (A-Z)</Label>
				</div>
				<div className="flex items-center gap-3 px-4 py-2">
					<RadioGroupItem value="name_za" id="name_za" />
					<Label htmlFor="name_za">По названию (Z-A)</Label>
				</div>
			</RadioGroup>
			<Separator />
			<RadioGroup defaultValue="desc" className="py-1">
				<div className="flex items-center gap-3 px-4 py-2">
					<RadioGroupItem value="desc" id="desc" />
					<Label htmlFor="desc">По убыванию</Label>
				</div>
				<div className="flex items-center gap-3 px-4 py-2">
					<RadioGroupItem value="asc" id="asc" />
					<Label htmlFor="asc">По возрастанию</Label>
				</div>
			</RadioGroup>
		</div>
	)
}
