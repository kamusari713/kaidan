import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/shared/components/ui'
import { Bell } from 'lucide-react'
import React from 'react'

export const NotificationPopover: React.FC = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group/bell">
					<Bell className="stroke-accent fill-accent group-hover/bell:stroke-card group-hover/bell:fill-card" size={20} absoluteStrokeWidth />
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
