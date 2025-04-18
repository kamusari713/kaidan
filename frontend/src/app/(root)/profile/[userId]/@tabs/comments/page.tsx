'use client'

import { CommentsCardSection } from '@/src/components/common/profile/tabs/comments'
import { Label, RadioGroup, RadioGroupItem, Separator, TitleSeparator } from '@/src/components/ui'

export default function CommentsTab() {
	return (
		<div className="flex gap-6 w-full">
			<div className="flex flex-col w-[300px] text-[14px] pb-2 bg-card rounded-xl border shadow">
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

			<CommentsCardSection />
		</div>
	)
}
