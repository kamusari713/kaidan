import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apolloClient = new ApolloClient({
	uri: 'http://localhost:8080/graphql',
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
