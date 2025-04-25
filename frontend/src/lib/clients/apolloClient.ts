import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client'

const httpLink = createHttpLink({
	uri: process.env.NEXT_PUBLIC_GRAPHQL_URI,
})

export const apolloClient = new ApolloClient({
	link: httpLink,
	cache: new InMemoryCache({
		typePolicies: {
			Query: {
				fields: {
					anime: {
						keyArgs: ['shikimoriId'],
						merge(existing, incoming) {
							return { ...existing, ...incoming }
						},
					},
				},
			},
			Anime: {
				keyFields: ['shikimoriId'],
			},
		},
	}),
})
