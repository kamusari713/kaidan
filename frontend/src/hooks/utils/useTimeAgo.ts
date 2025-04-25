import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import 'dayjs/locale/ru'

dayjs.extend(relativeTime)
dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.locale('ru')

export const useTimeAgo = (isoString: string, timeZone = 'Europe/Astrakhan') => {
	const result = dayjs.utc(isoString).tz(timeZone).fromNow()
	return result.match('несколько') ? 'только что' : result
}
