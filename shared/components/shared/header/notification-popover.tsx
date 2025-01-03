import { Button, Popover, PopoverContent, PopoverTrigger, Separator } from '@/shared/components/ui'
import { Bell } from 'lucide-react'
import React from 'react'

export const NotificationPopover: React.FC = () => {
	return (
		<Popover>
			<PopoverTrigger asChild>
				<Button variant="ghost" className="group text-[14px]">
					<Bell className="stroke-foreground fill-foreground group-hover:stroke-accent/60 group-hover:fill-accent/60" size={20} absoluteStrokeWidth />
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
