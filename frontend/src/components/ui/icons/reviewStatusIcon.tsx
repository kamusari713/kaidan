import { ReviewStatus } from '@/types/review'
import { FC } from 'react'
import { PokerFace, SadFace, SmileFace } from './'

interface ReviewStatusIconProps {
	size?: number
	status: ReviewStatus
}

export const ReviewStatusIcon: FC<ReviewStatusIconProps> = ({ size = 20, status }) => {
	return status === 'POSITIVE' ? <SmileFace size={size} /> : status === 'NEUTRAL' ? <PokerFace size={size} /> : <SadFace size={size} />
}
