'use client'

import { Card, CardContent } from '@/components/ui'
import { apolloClient } from '@/lib/clients'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import Link from 'next/link'
import { useCallback, useEffect, useState } from 'react'
import { InView } from 'react-intersection-observer'
import Select from 'react-select'
import AsyncSelect from 'react-select/async'

const TAGS_QUERY = gql`
	query SearchTags($search: String, $limit: Int) {
		tags(search: $search, limit: $limit) {
			RU {
				name
			}
		}
	}
`

const PAGE_QUERY = gql`
	query Page($page: Int, $perPage: Int, $search: String, $filter: AnimeFilter, $sort: Sort) {
		page(page: $page, perPage: $perPage, search: $search, filter: $filter, sort: $sort) {
			pageInfo {
				totalPages
				currentPage
				hasNextPage
			}
			media {
				shikimoriId
				title {
					RU
					EN
				}
				coverImage {
					extraLarge
				}
				genres {
					RU
				}
				shikimoriScore
				episodes
				kind
				status {
					RU
				}
			}
		}
	}
`

const FILTERS_QUERY = gql`
	query GetFilters {
		genres {
			RU
		}
		studios
		kinds
		ratings
	}
`

const CatalogPage = () => {
	const [search, setSearch] = useState('')
	const [filters, setFilters] = useState({})
	const [sort, setSort] = useState({ orderBy: 'shikimoriId', direction: 'ASC' })
	const [allAnime, setAllAnime] = useState([])
	const [hasMore, setHasMore] = useState(true)
	const { data: filtersData } = useQuery(FILTERS_QUERY)

	const genreOptions =
		filtersData?.genres.map((g) => ({
			value: g.RU,
			label: g.RU,
		})) || []

	const studioOptions =
		filtersData?.studios.map((s) => ({
			value: s,
			label: s,
		})) || []

	const kindOptions =
		filtersData?.kinds.map((k) => ({
			value: k,
			label: k,
		})) || []

	const ratingOptions =
		filtersData?.ratings.map((r) => ({
			value: r,
			label: r,
		})) || []
	const [getAnime, { data, loading, error, fetchMore }] = useLazyQuery(PAGE_QUERY, {
		notifyOnNetworkStatusChange: true,
	})

	const debouncedSearch = useCallback(
		debounce((value) => setSearch(value), 1000),
		[]
	)

	const resetAndFetch = useCallback(() => {
		setAllAnime([])
		setHasMore(true)
		getAnime({
			variables: {
				page: 1,
				perPage: 20,
				search,
				filter: filters,
				sort: sort,
			},
		})
	}, [search, filters, sort, getAnime])

	useEffect(() => {
		resetAndFetch()
	}, [resetAndFetch])

	useEffect(() => {
		if (data) {
			setAllAnime(data.page.media)
			setHasMore(data.page.pageInfo.hasNextPage)
		}
	}, [data])

	const loadMore = () => {
		if (!hasMore || loading) return

		fetchMore({
			variables: { page: data.page.pageInfo.currentPage + 1 },
			updateQuery: (prev, { fetchMoreResult }) => {
				if (!fetchMoreResult) return prev
				return {
					...prev,
					page: {
						...prev.page,
						media: [...prev.page.media, ...fetchMoreResult.page.media],
						pageInfo: fetchMoreResult.page.pageInfo,
					},
				}
			},
		})
	}

	const handleFilterChange = (key) => (selectedOptions) => {
		setFilters((prev) => ({
			...prev,
			[key]: selectedOptions ? selectedOptions.map((o) => o.value) : [],
		}))
	}

	const handleInputChange = (key) => (e) => {
		setFilters((prev) => ({ ...prev, [key]: e.target.value }))
	}

	const handleSortChange = (key) => (selectedOption) => {
		setSort((prev) => ({ ...prev, [key]: selectedOption.value }))
	}

	return (
		<div className="container mx-auto p-6 bg-card min-h-screen">
			<h1 className="text-3xl font-bold mb-6">Аниме каталог</h1>

			{/* Фильтры и поиск */}
			<div className="mb-6">
				<input type="text" onChange={(e) => debouncedSearch(e.target.value)} placeholder="Поиск по названию..." className="w-full p-3 border rounded mb-4" />

				<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
					<Select isMulti options={genreOptions} onChange={handleFilterChange('genres')} placeholder="Жанры" />

					<AsyncSelect
						cacheOptions
						defaultOptions
						loadOptions={async (input) => {
							const { data } = await apolloClient.query({
								query: TAGS_QUERY,
								variables: { search: input, limit: 40 },
								fetchPolicy: 'no-cache',
							})
							return data.tags.map((tag) => ({
								value: tag.RU.name,
								label: tag.RU.name,
							}))
						}}
						onChange={handleFilterChange('tags')}
						placeholder="Теги"
						isMulti
						className="w-full"
					/>
					<Select isMulti options={studioOptions} onChange={handleFilterChange('studios')} placeholder="Студии" />
				</div>

				<div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
					<Select isMulti options={kindOptions} onChange={handleFilterChange('kind')} placeholder="Тип" />
					<Select isMulti options={ratingOptions} onChange={handleFilterChange('rating')} placeholder="Рейтинг" />
					<input type="number" placeholder="Эпизоды" onChange={handleInputChange('episodes')} className="p-2 border rounded" />
					<input type="number" step="0.1" placeholder="Мин. оценка" onChange={handleInputChange('score')} className="p-2 border rounded" />
				</div>

				<div className="flex gap-4">
					<Select
						options={[
							{ value: 'shikimoriId', label: 'ID' },
							{ value: 'shikimoriScore', label: 'Оценка' },
							{ value: 'episodes', label: 'Эпизоды' },
						]}
						onChange={handleSortChange('orderBy')}
						defaultValue={{ value: 'shikimoriId', label: 'ID' }}
						className="flex-1"
					/>
					<Select
						options={[
							{ value: 'ASC', label: 'По возрастанию' },
							{ value: 'DESC', label: 'По убыванию' },
						]}
						onChange={handleSortChange('direction')}
						defaultValue={{ value: 'ASC', label: 'По возрастанию' }}
					/>
				</div>
			</div>

			{/* Индикаторы загрузки и ошибок */}
			{loading && <p className="text-center my-4">Загрузка...</p>}
			{error && <p className="text-red-500">Ошибка: {error.message}</p>}

			{/* Список аниме */}
			<div className="grid grid-cols-5 gap-6">
				{allAnime.map((anime) => (
					<Link href={`/anime/${anime.shikimoriId}`} key={anime.shikimoriId}>
						<Card>
							<CardContent>
								<Image src={anime.coverImage?.extraLarge} alt={anime.title.RU} width={300} height={200} className="w-48 h-60 object-cover rounded mb-2" />
								<h3 className="font-bold">{anime.title.RU || anime.title.EN}</h3>
								<p className="text-sm text-foreground/60">{anime.genres?.map((g) => g.RU).join(', ') || 'Нет жанров'}</p>
								<div className="mt-2">
									<span className="bg-primary p-1 rounded">{anime.kind || 'Не указан'}</span>
									<span className="ml-2">Эпизоды: {anime.episodes || 'N/A'}</span>
									<span className="ml-2">Оценка: {anime.shikimoriScore || 'N/A'}</span>
								</div>
							</CardContent>
						</Card>
					</Link>
				))}
			</div>

			{/* Компонент для бесконечной прокрутки */}
			<InView
				threshold={0}
				onChange={(inView) => {
					if (inView) loadMore()
				}}
			>
				<div className="h-10" />
			</InView>

			{/* Сообщение об окончании списка */}
			{!hasMore && allAnime.length > 0 && <p className="text-center my-4 text-foreground/60">Больше аниме нет</p>}
		</div>
	)
}

export default CatalogPage
