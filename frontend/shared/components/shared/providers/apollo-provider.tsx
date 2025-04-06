'use client'

import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client'
import { FC, PropsWithChildren } from 'react'

export const client = new ApolloClient({
	uri: 'http://localhost:8080/graphql',
	cache: new InMemoryCache(),
})

export const ApolloClientProvider: FC<PropsWithChildren> = ({ children }) => {
	return <ApolloProvider client={client}>{children}</ApolloProvider>
}
