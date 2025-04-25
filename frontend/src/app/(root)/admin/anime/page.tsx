'use client'

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Textarea } from '@/components/ui'
import { apolloClient } from '@/lib/clients'
import { gql, useMutation, useQuery } from '@apollo/client'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import AsyncSelect from 'react-select/async'

const CREATE_ANIME = gql`
	mutation CreateAnime($input: AnimeRaw!) {
		createAnime(input: $input) {
			shikimoriId
			title {
				RU
			}
			kind
			rating
			episodes
			coverImage {
				extraLarge
				banner
			}
			description {
				RU
				EN
			}
			genres {
				RU
			}
			tags {
				RU {
					name
				}
			}
			studios
		}
	}
`

const UPDATE_ANIME = gql`
	mutation UpdateAnime($shikimoriId: String!, $input: AnimeRaw!) {
		updateAnime(shikimoriId: $shikimoriId, input: $input) {
			shikimoriId
			title {
				RU
			}
			kind
			rating
			episodes
			coverImage {
				extraLarge
				banner
			}
			description {
				RU
				EN
			}
			genres {
				RU
			}
			tags {
				RU {
					name
				}
			}
			studios
		}
	}
`

const DELETE_ANIME = gql`
	mutation DeleteAnime($shikimoriId: String!) {
		deleteAnime(shikimoriId: $shikimoriId) {
			shikimoriId
		}
	}
`

const GET_GENRES = gql`
	query GetGenres {
		genres {
			RU
		}
	}
`

const GET_KINDS = gql`
	query GetKinds {
		kinds
	}
`

const GET_RATINGS = gql`
	query GetRatings {
		ratings
	}
`

const GET_STUDIOS = gql`
	query GetStudios {
		studios
	}
`

const TAGS_QUERY = gql`
	query SearchTags($search: String, $limit: Int) {
		tags(search: $search, limit: $limit) {
			RU {
				name
			}
		}
	}
`

const GET_ANIMES = gql`
	query GetAnimes($page: Int, $perPage: Int, $sort: Sort, $search: String) {
		page(page: $page, perPage: $perPage, sort: $sort, search: $search) {
			pageInfo {
				totalPages
				currentPage
				hasNextPage
				lastPage
				perPage
			}
			media {
				shikimoriId
				title {
					RU
				}
				kind
				rating
				status {
					RU
				}
				shikimoriScore
				episodes
				coverImage {
					extraLarge
					banner
				}
				description {
					RU
					EN
				}
				genres {
					RU
				}
				tags {
					RU {
						name
					}
				}
				studios
			}
		}
	}
`

export default function AdminAnimeComponent() {
	const { data: genresData } = useQuery(GET_GENRES)
	const { data: kindsData } = useQuery(GET_KINDS)
	const { data: ratingsData } = useQuery(GET_RATINGS)
	const { data: studiosData } = useQuery(GET_STUDIOS)

	const router = useRouter()

	const genreOptions = genresData?.genres?.map((g) => ({ value: g.RU, label: g.RU })) || []
	const kindOptions = kindsData?.kinds?.map((k) => ({ value: k, label: k })) || []
	const ratingOptions = ratingsData?.ratings?.map((r) => ({ value: r, label: r })) || []
	const studioOptions = studiosData?.studios?.map((s) => ({ value: s, label: s })) || []

	const loadTags = async (input) => {
		const { data } = await apolloClient.query({
			query: TAGS_QUERY,
			variables: { search: input, limit: 40 },
			fetchPolicy: 'no-cache',
		})
		return (
			data?.tags?.map((tag) => ({
				value: tag.RU?.name,
				label: tag.RU?.name,
			})) || []
		)
	}

	const addForm = useForm({
		defaultValues: {
			shikimoriId: '',
			titleRU: '',
			kind: '',
			rating: '',
			episodes: 0,
			genres: [],
			tags: [],
			studios: [],
			coverImageExtraLarge: '',
			coverImageBanner: '',
			descriptionRU: '',
			descriptionEN: '',
		},
	})

	addForm.register('coverImageExtraLarge', {
		pattern: {
			value: /^(https?:\/\/.*\.(?:png|jpg|jpeg|gif|webp))/i,
			message: 'Введите корректный URL изображения',
		},
	})

	const editForm = useForm({
		defaultValues: {
			shikimoriId: '',
			titleRU: '',
			kind: '',
			rating: '',
			episodes: 0,
			genres: [],
			tags: [],
			studios: [],
			coverImageExtraLarge: '',
			coverImageBanner: '',
			descriptionRU: '',
			descriptionEN: '',
		},
	})

	const [page, setPage] = useState(1)
	const [perPage] = useState(10)
	const [sort, setSort] = useState({ orderBy: 'shikimoriId', direction: 'ASC' })
	const [search, setSearch] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [selectedAnime, setSelectedAnime] = useState(null)

	const { data, loading, error } = useQuery(GET_ANIMES, {
		variables: { page, perPage, sort, search },
		fetchPolicy: 'network-only',
	})

	const [createAnime, { loading: createLoading, error: createError }] = useMutation(CREATE_ANIME, {
		client: apolloClient,
		refetchQueries: [{ query: GET_ANIMES, variables: { page, perPage, sort, search } }],
	})

	const [updateAnime, { loading: updateLoading, error: updateError }] = useMutation(UPDATE_ANIME, {
		client: apolloClient,
		refetchQueries: [{ query: GET_ANIMES, variables: { page, perPage, sort, search } }],
	})

	const [deleteAnime, { loading: deleteLoading, error: deleteError }] = useMutation(DELETE_ANIME, {
		client: apolloClient,
		refetchQueries: [{ query: GET_ANIMES, variables: { page, perPage, sort, search } }],
	})

	const formatAnimeInput = (data) => ({
		shikimoriId: data.shikimoriId,
		title: { RU: data.titleRU },
		kind: data.kind,
		rating: data.rating,
		episodes: data.episodes,
		coverImage: {
			extraLarge: data.coverImageExtraLarge,
			banner: data.coverImageBanner,
		},
		description: {
			RU: data.descriptionRU,
			EN: data.descriptionEN,
		},
		genres: data.genres.map((genre) => ({ RU: genre })),
		tags: data.tags.map((tag) => ({ RU: { name: tag } })),
		studios: data.studios,
	})

	const animes = data?.page?.media || []
	const totalPages = data?.page?.pageInfo?.totalPages || 1

	const handleSort = (orderBy) => {
		if (sort.orderBy === orderBy) {
			setSort((prev) => ({
				...prev,
				direction: prev.direction === 'ASC' ? 'DESC' : 'ASC',
			}))
		} else {
			setSort({ orderBy, direction: 'ASC' })
		}
	}

	const onAddSubmit = async (data) => {
		try {
			const animeInput = formatAnimeInput(data)
			await createAnime({ variables: { input: animeInput } })
			setIsAddOpen(false)
			addForm.reset()
		} catch (err) {
			console.error('Ошибка создания аниме:', err)
		}
	}

	const onEditSubmit = async (data) => {
		if (selectedAnime) {
			try {
				const animeInput = formatAnimeInput(data)
				await updateAnime({
					variables: {
						shikimoriId: selectedAnime.shikimoriId,
						input: animeInput,
					},
				})
				setIsEditOpen(false)
				setSelectedAnime(null)
				editForm.reset()
			} catch (err) {
				console.error('Ошибка обновления аниме:', err)
			}
		}
	}

	const onDeleteSubmit = async () => {
		if (selectedAnime) {
			try {
				await deleteAnime({
					variables: { shikimoriId: selectedAnime.shikimoriId },
				})
				setSelectedAnime(null)
			} catch (err) {
				console.error('Ошибка удаления аниме:', err)
			}
		}
	}

	useEffect(() => {
		if (selectedAnime) {
			editForm.reset({
				shikimoriId: selectedAnime.shikimoriId || '',
				titleRU: selectedAnime.title?.RU || '',
				kind: selectedAnime.kind || '',
				rating: selectedAnime.rating || '',
				episodes: selectedAnime.episodes || 0,
				genres: selectedAnime.genres?.map((g) => g.RU) || [],
				tags: selectedAnime.tags?.map((t) => t.RU.name) || [],
				studios: selectedAnime.studios || [],
				coverImageExtraLarge: selectedAnime.coverImage?.extraLarge || '',
				coverImageBanner: selectedAnime.coverImage?.banner || '',
				descriptionRU: selectedAnime.description?.RU || '',
				descriptionEN: selectedAnime.description?.EN || '',
			})
		}
	}, [selectedAnime, editForm])

	const debouncedSearch = useCallback(
		debounce((value) => {
			if (value.trim()) {
				setSearch(value)
			} else {
				setSearch('')
			}
		}, 1000),
		[]
	)

	const handleInputChange = (e) => {
		const value = e.target.value
		setInputValue(value)
		debouncedSearch(value)
	}

	useEffect(() => {
		return () => {
			debouncedSearch.cancel()
		}
	}, [debouncedSearch])

	if (loading) return <div className="p-4">Загрузка...</div>
	if (error) return <div className="p-4">Ошибка: {error.message}</div>
	if (createError) return <div className="p-4">Ошибка создания: {createError.message}</div>
	if (updateError) return <div className="p-4">Ошибка обновления: {updateError.message}</div>
	if (deleteError) return <div className="p-4">Ошибка удаления: {deleteError.message}</div>

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Админ панель - Аниме</h1>

			{/* Панель поиска и пагинации */}
			<div className="my-4 flex items-center gap-4">
				<Button onClick={() => setIsAddOpen(true)} disabled={createLoading}>
					{createLoading ? 'Создание...' : 'Добавить аниме'}
				</Button>
				<Input placeholder="Поиск по названию..." value={inputValue} onChange={handleInputChange} className="w-64" />
				<Button onClick={() => setPage((prev) => prev - 1)} disabled={page <= 1}>
					Пред.
				</Button>
				<span>
					Страница {page} из {totalPages}
				</span>
				<Button onClick={() => setPage((prev) => prev + 1)} disabled={page >= totalPages}>
					След.
				</Button>
			</div>

			{/* Таблица аниме */}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead onClick={() => handleSort('shikimoriId')} className="cursor-pointer">
							ID {sort.orderBy === 'shikimoriId' && (sort.direction === 'ASC' ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('title.RU')} className="cursor-pointer">
							Название {sort.orderBy === 'title.RU' && (sort.direction === 'ASC' ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('kind')} className="cursor-pointer">
							Тип {sort.orderBy === 'kind' && (sort.direction === 'ASC' ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('status.RU')} className="cursor-pointer">
							Статус {sort.orderBy === 'status.RU' && (sort.direction === 'ASC' ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('shikimoriScore')} className="cursor-pointer">
							Рейтинг {sort.orderBy === 'shikimoriScore' && (sort.direction === 'ASC' ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('episodes')} className="cursor-pointer">
							Эпизоды {sort.orderBy === 'episodes' && (sort.direction === 'ASC' ? '↑' : '↓')}
						</TableHead>
						<TableHead></TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{animes.map((anime) => (
						<TableRow key={anime.shikimoriId} className="hover:cursor-pointer hover:bg-primary/60" onClick={() => router.push(`/anime/${anime.shikimoriId}`)}>
							<TableCell>{anime.shikimoriId}</TableCell>
							<TableCell>{anime.title.RU}</TableCell>
							<TableCell>{anime.kind}</TableCell>
							<TableCell>{anime.status.RU}</TableCell>
							<TableCell>{anime.shikimoriScore}</TableCell>
							<TableCell>{anime.episodes}</TableCell>
							<TableCell className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={(e) => {
										e.stopPropagation()
										setSelectedAnime(anime)
										setIsEditOpen(true)
									}}
									disabled={updateLoading}
								>
									{updateLoading ? 'Обновление...' : 'Редактировать'}
								</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={(e) => {
										e.stopPropagation()
										setSelectedAnime(anime)
									}}
									disabled={deleteLoading}
								>
									{deleteLoading ? 'Удаление...' : 'Удалить'}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Модалка добавления */}
			<Dialog open={isAddOpen} onOpenChange={setIsAddOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Добавить аниме</DialogTitle>
					</DialogHeader>
					<form onSubmit={addForm.handleSubmit(onAddSubmit)}>
						<div className="space-y-4">
							<div>
								<Label>Shikimori ID</Label>
								<Input {...addForm.register('shikimoriId', { required: true })} placeholder="Введите Shikimori ID" />
							</div>
							<div>
								<Label>Название (RU)</Label>
								<Input {...addForm.register('titleRU', { required: true })} placeholder="Введите название" />
							</div>
							<div>
								<Label>Тип</Label>
								<Controller
									control={addForm.control}
									name="kind"
									render={({ field }) => (
										<ReactSelect
											options={kindOptions}
											value={field.value ? kindOptions.find((opt) => opt.value === field.value) : null}
											onChange={(selected) => field.onChange(selected?.value)}
											placeholder="Выберите тип"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Рейтинг</Label>
								<Controller
									control={addForm.control}
									name="rating"
									render={({ field }) => (
										<ReactSelect
											options={ratingOptions}
											value={field.value ? ratingOptions.find((opt) => opt.value === field.value) : null}
											onChange={(selected) => field.onChange(selected?.value)}
											placeholder="Выберите рейтинг"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Эпизоды</Label>
								<Input type="number" {...addForm.register('episodes', { valueAsNumber: true })} placeholder="Количество эпизодов" />
							</div>
							<div>
								<Label>Жанры</Label>
								<Controller
									control={addForm.control}
									name="genres"
									render={({ field }) => (
										<ReactSelect
											isMulti
											options={genreOptions}
											value={field.value?.map((v) => genreOptions.find((opt) => opt.value === v)) || []}
											onChange={(selected) => field.onChange(selected?.map((opt) => opt.value) || [])}
											placeholder="Выберите жанры"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Теги</Label>
								<Controller
									control={addForm.control}
									name="tags"
									render={({ field }) => (
										<AsyncSelect
											isMulti
											cacheOptions
											defaultOptions
											loadOptions={loadTags}
											value={field.value?.map((v) => ({ value: v, label: v })) || []}
											onChange={(selected) => field.onChange(selected?.map((opt) => opt.value) || [])}
											placeholder="Поиск тегов..."
										/>
									)}
								/>
							</div>
							<div>
								<Label>Студии</Label>
								<Controller
									control={addForm.control}
									name="studios"
									render={({ field }) => (
										<ReactSelect
											isMulti
											options={studioOptions}
											value={field.value?.map((v) => studioOptions.find((opt) => opt.value === v)) || []}
											onChange={(selected) => field.onChange(selected?.map((opt) => opt.value) || [])}
											placeholder="Выберите студии"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Обложка (Extra Large)</Label>
								<Input {...addForm.register('coverImageExtraLarge')} placeholder="URL обложки (extra large)" />
								{addForm.watch('coverImageExtraLarge') && <Image src={addForm.watch('coverImageExtraLarge')} alt="Обложка" width={200} height={300} className="mt-2 object-cover" />}
							</div>
							<div>
								<Label>Баннер</Label>
								<Input {...addForm.register('coverImageBanner')} placeholder="URL баннера" />
								{addForm.watch('coverImageBanner') && <Image src={addForm.watch('coverImageBanner')} alt="Баннер" width={400} height={200} className="mt-2 object-cover" />}
							</div>
							<div>
								<Label>Описание (RU)</Label>
								<Textarea {...addForm.register('descriptionRU')} placeholder="Описание на русском" />
							</div>
							<div>
								<Label>Описание (EN)</Label>
								<Textarea {...addForm.register('descriptionEN')} placeholder="Описание на английском" />
							</div>
							<Button type="submit" disabled={createLoading}>
								{createLoading ? 'Создание...' : 'Добавить'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>

			{/* Модалка редактирования */}
			<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Редактировать аниме</DialogTitle>
					</DialogHeader>
					<form onSubmit={editForm.handleSubmit(onEditSubmit)}>
						<div className="space-y-4">
							<div>
								<Label>Shikimori ID</Label>
								<Input {...editForm.register('shikimoriId', { required: true })} placeholder="Введите Shikimori ID" />
							</div>
							<div>
								<Label>Название (RU)</Label>
								<Input {...editForm.register('titleRU', { required: true })} placeholder="Введите название" />
							</div>
							<div>
								<Label>Тип</Label>
								<Controller
									control={editForm.control}
									name="kind"
									render={({ field }) => (
										<ReactSelect
											options={kindOptions}
											value={field.value ? kindOptions.find((opt) => opt.value === field.value) : null}
											onChange={(selected) => field.onChange(selected?.value)}
											placeholder="Выберите тип"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Рейтинг</Label>
								<Controller
									control={editForm.control}
									name="rating"
									render={({ field }) => (
										<ReactSelect
											options={ratingOptions}
											value={field.value ? ratingOptions.find((opt) => opt.value === field.value) : null}
											onChange={(selected) => field.onChange(selected?.value)}
											placeholder="Выберите рейтинг"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Эпизоды</Label>
								<Input type="number" {...editForm.register('episodes', { valueAsNumber: true })} placeholder="Количество эпизодов" />
							</div>
							<div>
								<Label>Жанры</Label>
								<Controller
									control={editForm.control}
									name="genres"
									render={({ field }) => (
										<ReactSelect
											isMulti
											options={genreOptions}
											value={field.value?.map((v) => genreOptions.find((opt) => opt.value === v)) || []}
											onChange={(selected) => field.onChange(selected?.map((opt) => opt.value) || [])}
											placeholder="Выберите жанры"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Теги</Label>
								<Controller
									control={editForm.control}
									name="tags"
									render={({ field }) => (
										<AsyncSelect
											isMulti
											cacheOptions
											defaultOptions
											loadOptions={loadTags}
											value={field.value?.map((v) => ({ value: v, label: v })) || []}
											onChange={(selected) => field.onChange(selected?.map((opt) => opt.value) || [])}
											placeholder="Поиск тегов..."
										/>
									)}
								/>
							</div>
							<div>
								<Label>Студии</Label>
								<Controller
									control={editForm.control}
									name="studios"
									render={({ field }) => (
										<ReactSelect
											isMulti
											options={studioOptions}
											value={field.value?.map((v) => studioOptions.find((opt) => opt.value === v)) || []}
											onChange={(selected) => field.onChange(selected?.map((opt) => opt.value) || [])}
											placeholder="Выберите студии"
										/>
									)}
								/>
							</div>
							<div>
								<Label>Обложка (Extra Large)</Label>
								<Input {...editForm.register('coverImageExtraLarge')} placeholder="URL обложки (extra large)" />
							</div>
							<div>
								<Label>Баннер</Label>
								<Input {...editForm.register('coverImageBanner')} placeholder="URL баннера" />
							</div>
							<div>
								<Label>Описание (RU)</Label>
								<Textarea {...editForm.register('descriptionRU')} placeholder="Описание на русском" />
							</div>
							<div>
								<Label>Описание (EN)</Label>
								<Textarea {...editForm.register('descriptionEN')} placeholder="Описание на английском" />
							</div>
							<Button type="submit" disabled={updateLoading}>
								{updateLoading ? 'Сохранение...' : 'Сохранить изменения'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
		</div>
	)
}
