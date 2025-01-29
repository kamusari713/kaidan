import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui'
import { FC } from 'react'

export const SectionUpdatesTabs: FC = () => {
	return (
		<div className="bg-card rounded-xl w-1/2 h-fit border shadow">
			<Tabs className="flex flex-col" defaultValue="tab1">
				<TabsList className="flex justify-between px-4 py-3">
					<div>Последние обновления</div>
					<div>
						<TabsTrigger value="tab1" variant="section">
							Все обновления
						</TabsTrigger>
						<TabsTrigger value="tab2" variant="section">
							Мои обновления
						</TabsTrigger>
					</div>
				</TabsList>
				<Separator />
				<TabsContent value="tab1">
					<div>
						{Array.from({ length: 5 }, (_, index) => (
							<div key={index}>
								<div className="group/item hover:cursor-pointer hover:bg-accent/20 flex gap-4 p-4">
									<div className="w-[100px] bg-accent rounded-xl aspect-[8/12]"></div>
									<div className="flex flex-col justify-between w-full py-6">
										<div className="text-[15px] group-hover/item:text-accent">Противостоящий небесам</div>
										<div className="text-[13px] font-light">Эпизод 371</div>
										<div className="text-[11px] text-foreground/60">14 минут назад</div>
									</div>
								</div>
								{index < 5 - 1 ? <Separator /> : null}
							</div>
						))}
					</div>
				</TabsContent>
				<TabsContent value="tab2">
					<div className="flex items-center text-center p-4 my-[20px]">
						Данный список показывает тайтлы на основе ваших настроек уведомлений и то, что у вас находится в закладках. Подписывайтесь на уведомления озвучек , чтобы отобразить тайтлы
						здесь.
					</div>
				</TabsContent>
			</Tabs>
		</div>
	)
}
