import { Container } from '@/shared/components'
import { Separator, Tabs, TabsContent, TabsList, TabsTrigger } from '@/shared/components/ui'
import { ArrowRight, MessagesSquare } from 'lucide-react'

export default function Home() {
	return (
		<>
			<Container>
				<div className="flex gap-4 p-4 mt-10 bg-card rounded-xl overflow-x-auto h-fit-auto border shadow">
					{Array.from({ length: 10 }, (_, index) => (
						<div key={index} className="group/item hover:cursor-pointer w-[216px] p-2">
							<div className="w-[200px] aspect-[8/12] bg-accent rounded-xl"></div>
							<div className="group-hover/item:text-accent truncate">Lorem ipsum dolor sit amet.</div>
							<div className="text-foreground/60">Lorem, ipsum dolor.</div>
						</div>
					))}
				</div>
				<div className="flex gap-6 mt-10">
					<div className="bg-card rounded-xl w-1/2 h-fit">
						<Tabs className="flex flex-col" defaultValue="tab1">
							<TabsList className="flex justify-between px-4 py-3">
								<div>Последние обновления</div>
								<div>
									<TabsTrigger value="tab1">Все обновления</TabsTrigger>
									<TabsTrigger value="tab2">Мои обновления</TabsTrigger>
								</div>
							</TabsList>
							<Separator />
							<TabsContent value="tab1">
								<div className="px-4 py-3">
									{Array.from({ length: 5 }, (_, index) => (
										<>
											<div key={index} className="flex gap-6">
												<div className="w-[100px] bg-accent rounded-xl aspect-[8/12]"></div>
												<div className="flex flex-col justify-between w-full p-4">
													<div>Lorem, ipsum dolor.</div>
													<div>Lorem, ipsum.</div>
													<div>Lorem, ipsum.</div>
												</div>
											</div>
											{index < 4 ? <Separator className="m-2" /> : null}
										</>
									))}
								</div>
							</TabsContent>
							<TabsContent className="flex items-center text-center p-4 my-[20px]" value="tab2">
								Данный список показывает тайтлы на основе ваших настроек уведомлений и то, что у вас находится в закладках. Подписывайтесь на уведомления озвучек , чтобы отобразить
								тайтлы здесь.
							</TabsContent>
						</Tabs>
					</div>
					<div className="flex flex-col gap-6 w-1/2">
						<div className="flex flex-col gap-2">
							<div className="group/forum hover:cursor-pointer flex items-center gap-2 ml-4 w-fit">
								<div className="group-hover/forum:text-accent">Последние темы форума</div> <ArrowRight className="group-hover/forum:stroke-accent stroke-foreground" size={16} />
							</div>
							<div className="bg-card rounded-xl px-4 py-3">
								<div className="flex justify-between">
									<div>Lorem ipsum dolor sit amet consectetur adipisicing.</div>
									<div className="flex items-center gap-2">
										<MessagesSquare className="stroke-foreground" size={12} />0
									</div>
								</div>
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<div className="group/feedbacks hover:cursor-pointer flex items-center gap-2 ml-4">
								<div className="group-hover/feedbacks:text-accent">Последние отзывы</div> <ArrowRight className="group-hover/feedbacks:stroke-accent stroke-foreground" size={16} />
							</div>
							<div className="flex justify-between flex-wrap w-full gap-4">
								{Array.from({ length: 6 }, (_, index) => (
									<div key={index} className="w-[calc(50%-8px)] bg-card h-[150px] rounded-xl"></div>
								))}
							</div>
						</div>
					</div>
				</div>
			</Container>
			<Container className="flex justify-between items-end text-[16px] p-4 bg-card w-full mt-[20px] border shadow rounded-xl">
				<div className="flex flex-col">
					<div>Обращайтесь на почту manfigy@mail.ru</div>
					<div>Политика конфиденциальности: Мы уважаем ваши права, даже если вы Омежка.</div>
				</div>
				<div>©2024 KAIDAN</div>
			</Container>
		</>
	)
}
