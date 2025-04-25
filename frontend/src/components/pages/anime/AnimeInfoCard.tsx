import { AnimeListPopoverMenu } from '@/components/common/anime'
import { Skeleton } from '@/components/ui'
import { ShikimoriLogo, Star } from '@/components/ui/icons'
import { AnimeInfo } from '@/types/anime'
import Image from 'next/image'
import { FC } from 'react'

interface AnimeInfoCardProps {
	userId?: string
	anime?: AnimeInfo
	animeId: string
	isLoading: boolean
}
export const AnimeInfoCard: FC<AnimeInfoCardProps> = ({ userId, anime, animeId, isLoading }) => {
	return (
		<>
			<div className="h-96 col-span-3 row-span-2 rounded-lg relative z-10" style={{ gridArea: '1 / 1 / 3 / 4' }}>
				{!isLoading ? (
					<Image className="rounded-lg object-cover" fill src={anime?.coverImage.banner!} alt="anime banner image" />
				) : (
					<Skeleton className="w-full h-96 rounded-lg object-cover" />
				)}
				<div className="absolute inset-0 bg-black/50 rounded-lg"></div>
			</div>
			<div
				className="flex flex-col justify-start gap-2 col-start-2 row-start-2 rounded-lg z-20"
				style={{
					gridArea: '2 / 2 / 3 / 3',
				}}
			>
				{!isLoading ? (
					<>
						<h1 className="text-2xl h-8 line-clamp-1 text-white font-bold">{anime?.title.RU}</h1>
						<h1 className="text-xl  h-6 line-clamp-1 text-white">{anime?.title.ROMAJI}</h1>
					</>
				) : (
					<>
						<Skeleton className="w-1/2 h-8" />
						<Skeleton className="w-1/2 h-6" />
					</>
				)}
			</div>
			<div
				className="flex flex-col gap-2 items-end justify-end m-4 col-start-3 row-start-2 z-20"
				style={{
					gridArea: '2 / 3 / 3 / 4',
				}}
			>
				<div className="flex items-center min-w-10 gap-2">
					<Star />
					{!isLoading ? <strong className="flex items-center h-10 text-white text-xl">{anime?.averageScore ? anime?.averageScore : '0.0'}</strong> : <Skeleton className="w-8 h-6" />}
				</div>
				<a className="flex items-center gap-2 w-full h-8 p-2 border bg-card/20 rounded-md hover:cursor-pointer" href={anime?.shikimoriUrl} target="_blank">
					<ShikimoriLogo />
					{!isLoading ? <strong className="flex items-center h-8 text-white text-l">Шикимори: {anime?.shikimoriScore}</strong> : <Skeleton className="w-32 h-4" />}
				</a>
			</div>
			<div
				className="col-start-1 row-start-3 -mt-32 mx-4 w-fit relative z-10"
				style={{
					gridArea: '3 / 1 / 4 / 2',
				}}
			>
				{!isLoading ? (
					<Image className="border rounded-lg z-50" src={anime?.coverImage.extraLarge!} alt={anime?.title.RU!} width={280} height={400} />
				) : (
					<Skeleton className="w-[280px] h-[400px]" />
				)}
				<div className="max-w-[280px] place-items-center mt-4">
					<AnimeListPopoverMenu className="w-full" userId={userId} animeId={animeId} />
					<div className="flex flex-col w-full mt-4 p-4 bg-card border gap-4 rounded-md">
						<div>
							{!isLoading ? (
								<>
									<strong className="w-full h-5">Тип:</strong> {anime?.kind}
								</>
							) : (
								<Skeleton className="w-full h-5" />
							)}
						</div>
						<div>
							{!isLoading ? (
								<>
									<strong className="w-full h-4">Статус:</strong> {anime?.status.RU}
								</>
							) : (
								<Skeleton className="w-full h-5" />
							)}
						</div>
						<div>
							{!isLoading ? (
								<>
									<strong className="w-full h-10">Выпуск:</strong> {anime?.startDate} - {anime?.endDate}
								</>
							) : (
								<Skeleton className="w-full h-10" />
							)}
						</div>
						<div>
							{!isLoading ? (
								<>
									<strong className="w-full h-5">Эпизоды:</strong> {anime?.episodes} ({anime?.duration} мин.)
								</>
							) : (
								<Skeleton className="w-full h-5" />
							)}
						</div>
						<div>
							{!isLoading ? (
								<>
									<strong className="w-full min-h-10">Студии:</strong> {anime?.studios.join(', ')}
								</>
							) : (
								<Skeleton className="w-full h-16" />
							)}
						</div>
					</div>
				</div>
			</div>
		</>
	)
}
