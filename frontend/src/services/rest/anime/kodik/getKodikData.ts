import { getKodikPlayer } from './getKodikPlayer'

export async function getKodikData(animeId: string) {
	const kodikData = await getKodikPlayer({ shikimoriId: animeId })
	if (!kodikData) {
		return null
	}
	return kodikData
}
