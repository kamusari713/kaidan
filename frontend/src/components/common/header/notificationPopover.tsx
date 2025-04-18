import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/src/components/ui'
import { Bell } from '@/src/components/ui/icons'
import React from 'react'

export const NotificationPopover: React.FC = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-[14px]">
					<Bell />
				</Button>
			</PopoverTrigger>
			<PopoverContent>
				<div className="p-2">Уведомления</div>
				<Separator />
				<div>asdasdasdasd</div>
			</PopoverContent>
		</Popover>
	)
}
