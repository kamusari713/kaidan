'use client'

import { apolloClient } from '@/src/lib/apolloClient'
import { ApolloProvider } from '@apollo/client'
import { FC, PropsWithChildren } from 'react'

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
	return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>
}
