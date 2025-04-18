import { getKodikPlayer } from '@/src/lib'
import { useQuery } from '@tanstack/react-query'

export const KodikVideo = ({ id, className }: { id: string, className?: string }) => {
	const { data, isPending, error } = useQuery({
		queryKey: ['anime', 'kodik', id],
		queryFn: async () => getKodikData(),
	})

	async function getKodikData() {
		const kodikData = await getKodikPlayer({ shikimoriId: id })
		if (!kodikData) {
			return null
		}
		return kodikData
	}

	if (isPending) {
		return <div>Loading</div>
	}

	if (error) {
		return <div>{error.message}</div>
	}

	if (!isPending && !data) {
		return <div>Video not found</div>
	}

	return (
		<div>
			<iframe className={className} src={data?.link} allow="autoplay *; fullscreen *"></iframe>
		</div>
	)
}
