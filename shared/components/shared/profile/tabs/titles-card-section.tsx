import React from 'react'

interface Props {
	tab: string
}

export const TitlesCardSection: React.FC<Props> = ({ tab }) => {
	return <div>{tab}</div>
}
