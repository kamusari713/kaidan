'use client'

import { Button, Dialog, DialogContent, DialogHeader, DialogTitle, Input, Label, Table, TableBody, TableCell, TableHead, TableHeader, TableRow, Textarea } from '@/components/ui'
import { apolloClient } from '@/lib/clients'
import { gql, useMutation, useQuery } from '@apollo/client'
import {useQuery as tanstackUseQuery} from '@tanstack/react-query'
import debounce from 'lodash.debounce'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'
import { Controller, useForm } from 'react-hook-form'
import ReactSelect from 'react-select'
import AsyncSelect from 'react-select/async'
import { getAnimeComments, getAnimeReviews } from '@/services/rest/anime'

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
            duration
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
					EN
				}
				shikimoriScore
				episodes
				duration
				externalLinks {
					source
					url
				}
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
	const statusOptions = [
		{ value: 'ВЫШЕЛ', label: 'ВЫШЕЛ' },
		{ value: 'ОНГОИНГ', label: 'ОНГОИНГ' }
	];

	const [page, setPage] = useState(1)
	const [perPage] = useState(10)
	const [sort, setSort] = useState({ orderBy: 'shikimoriId', direction: 'ASC' })
	const [search, setSearch] = useState('')
	const [inputValue, setInputValue] = useState('')
	const [isAddOpen, setIsAddOpen] = useState(false)
	const [isEditOpen, setIsEditOpen] = useState(false)
	const [selectedAnime, setSelectedAnime] = useState(null)

	const {
		data: commentsData,
	} = tanstackUseQuery({
		queryKey: ['anime-comments', selectedAnime?.shikimoriId],
		queryFn: () => getAnimeComments(selectedAnime?.shikimoriId),
		staleTime: 5 * 60 * 1000,
		enabled: !!selectedAnime,
	})

	const {
		data: reviewsData,
	} = tanstackUseQuery({
		queryKey: ['anime-reviews', selectedAnime?.shikimoriId],
		queryFn: () => getAnimeReviews(selectedAnime?.shikimoriId),
		enabled: !!selectedAnime,
	})


	const exportAnimeData = () => {
		if (!selectedAnime || !commentsData || !reviewsData) return;

		const exportData = {
			anime: selectedAnime.title.RU,
			comments: commentsData,
			reviews: reviewsData,
		};

		const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
		const url = URL.createObjectURL(blob);
		const link = document.createElement('a');
		link.href = url;
		link.download = `${selectedAnime.title.RU}.json`;
		document.body.appendChild(link);
		link.click();
		document.body.removeChild(link);
	};


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
			duration: 0,
			startDate: '',
			endDate: '',
			status: { EN: '', RU: '' },
			coverImage: { extraLarge: '', banner: '' },
			genres: [],
			tags: [],
			studios: [],
			description: { RU: '', EN: '' },
			externalLinks: [],
		},
	});

	addForm.register('coverImage.extraLarge', {
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
			externalLinks: [],
			duration: 0,
			startDate: '',
			endDate: '',
			status: { EN: '', RU: '' },
		},
	})

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
		title: {
			RU: data.titleRU,
			EN: "", // добавьте другие языки если нужно
			ROMAJI: "",
			NATIVE: ""
		},
		description: {
			RU: data.description.RU,
			EN: data.description.EN
		},
		episodes: data.episodes,
		duration: data.duration,
		startDate: data.startDate,
		endDate: data.endDate,
		status: {
			RU: data.status.RU,
			EN: data.status.EN
		},
		coverImage: {
			extraLarge: data.coverImage?.extraLarge,
			banner: data.coverImage?.banner,
			large: "",
			medium: "",
			color: ""
		},
		genres: data.genres.map(g => ({ RU: g, EN: "" })),
		tags: data.tags.map(t => ({
			RU: { name: t, description: "" },
			EN: { name: "", description: "" },
			rank: 0,
			isSpoiler: false
		})),
		studios: data.studios,
		externalLinks: data.externalLinks.map(link => ({
			source: link.source,
			url: link.url
		}))
	});

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

	const onDeleteSubmit = async (shikimoriId) => {
			try {
				await deleteAnime({
					variables: { shikimoriId: shikimoriId },
				})
				setSelectedAnime(null)
			} catch (err) {
				console.error('Ошибка удаления аниме:', err)
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
				duration: selectedAnime.duration || 0,
				startDate: selectedAnime.startDate || '',
				endDate: selectedAnime.endDate || '',
				status: selectedAnime.status || { EN: '', RU: '' },
				coverImage: {
					extraLarge: selectedAnime.coverImage?.extraLarge || '',
					banner: selectedAnime.coverImage?.banner || '',
				},
				genres: selectedAnime.genres?.map(g => g.RU) || [],
				tags: selectedAnime.tags?.map(t => t.RU.name) || [],
				studios: selectedAnime.studios || [],
				description: {
					RU: selectedAnime.description?.RU || '',
					EN: selectedAnime.description?.EN || '',
				},
				externalLinks: selectedAnime.externalLinks || [],
			});
		}
	}, [selectedAnime, editForm]);

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
			<h1 className="text-2xl font-bold mb-4">Панель администратора - Аниме</h1>

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
								</Button><Button
								variant="outline"
								size="sm"
								onClick={(e) => {
									e.stopPropagation()
									exportAnimeData(anime)}}
							>
								Экспорт
							</Button>
								<Button
									variant="destructive"
									size="sm"
									onClick={async (e) => {
										e.stopPropagation()
										setSelectedAnime(anime)
										await onDeleteSubmit(anime.shikimoriId)
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
				<DialogContent className="max-w-7xl">
					<DialogHeader>
						<DialogTitle>Добавить аниме</DialogTitle>
					</DialogHeader>
					<form onSubmit={addForm.handleSubmit(onAddSubmit)}>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
							{/* Колонка 1: Основные данные */}
							<div>
								<div>
									<Label>Shikimori ID</Label>
									<Input {...addForm.register('shikimoriId', { required: true })} placeholder="12345" />
								</div>
								<div>
									<Label>Название (RU)</Label>
									<Input {...addForm.register('titleRU', { required: true })} placeholder="Введи название" />
								</div>
								<div>
									<Label>Тип</Label>
									<Controller
										control={addForm.control}
										name="kind"
										render={({ field }) => (
											<ReactSelect
												options={kindOptions}
												value={field.value ? kindOptions.find(opt => opt.value === field.value) : null}
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
												value={field.value ? ratingOptions.find(opt => opt.value === field.value) : null}
												onChange={(selected) => field.onChange(selected?.value)}
												placeholder="Выберите рейтинг"
											/>
										)}
									/>
								</div>
								<div>
									<Label>Количество эпизодов</Label>
									<Input type="number" {...addForm.register('episodes', { valueAsNumber: true })} placeholder="0" />
								</div>
								<div>
									<Label>Продолжительность (мин)</Label>
									<Input type="number" {...addForm.register('duration', { valueAsNumber: true })} placeholder="24" />
								</div>
								<div>
									<Label>Дата начала</Label>
									<Input type="date" {...addForm.register('startDate')} />
								</div>
								<div>
									<Label>Дата окончания</Label>
									<Input type="date" {...addForm.register('endDate')} />
								</div>

								<div>
									<Label>Обложки</Label>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label>Extra Large</Label>
											<Input {...addForm.register('coverImage.extraLarge')} placeholder="URL" />
											{addForm.watch('coverImage.extraLarge') && (
												<Image
													src={addForm.watch('coverImage.extraLarge')}
													alt="Обложка"
													width={200}
													height={300}
													className="mt-2 object-cover rounded-md"
												/>
											)}
										</div>
										<div>
											<Label>Banner</Label>
											<Input {...addForm.register('coverImage.banner')} placeholder="URL" />
											{addForm.watch('coverImage.banner') && (
												<Image
													src={addForm.watch('coverImage.banner')}
													alt="Баннер"
													width={400}
													height={200}
													className="mt-2 object-cover rounded-md"
												/>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Колонка 2: Категории и связи */}
							<div>
								<div>
									<Label>Жанры</Label>
									<Controller
										control={addForm.control}
										name="genres"
										render={({ field }) => (
											<ReactSelect
												isMulti
												options={genreOptions}
												value={field.value?.map(v => genreOptions.find(opt => opt.value === v)) || []}
												onChange={(selected) => field.onChange(selected?.map(opt => opt.value))}
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
												value={field.value?.map(v => ({ value: v, label: v })) || []}
												onChange={(selected) => field.onChange(selected?.map(opt => opt.value))}
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
												value={field.value?.map(v => studioOptions.find(opt => opt.value === v)) || []}
												onChange={(selected) => field.onChange(selected?.map(opt => opt.value))}
												placeholder="Выберите студии"
											/>
										)}
									/>
								</div>
								<div>
									<Label>Статус</Label>
									<Controller
										control={addForm.control}
										name="status"
										render={({ field }) => (
											<ReactSelect
												options={statusOptions} // Добавьте запрос для получения статусов
												value={field.value.RU ? statusOptions.find(opt => opt.value === field.value.RU) : null}
												onChange={(selected) => {
													field.onChange({ EN: selected?.label, RU: selected?.value });
												}}
												placeholder="Выберите статус"
											/>
										)}
									/>
								</div>
								<div>
									<Label>Описание (RU)</Label>
									<Textarea {...addForm.register('description.RU')} placeholder="Описание на русском" />
								</div>
								<div>
									<Label>Описание (EN)</Label>
									<Textarea {...addForm.register('description.EN')} placeholder="Описание на английском" />
								</div>
								<div>
									<Label>Внешние ссылки</Label>
									<div className="space-y-2">
										{addForm.watch('externalLinks').map((_, index) => (
											<div key={index} className="flex gap-2">
												<Input placeholder="Источник" {...addForm.register(`externalLinks[${index}].source`)} />
												<Input placeholder="URL" {...addForm.register(`externalLinks[${index}].url`)} />
												<Button
													variant="outline"
													onClick={() => {
														const links = addForm.getValues('externalLinks');
														links.splice(index, 1);
														addForm.setValue('externalLinks', links);
													}}
												>
													Удалить
												</Button>
											</div>
										))}
										<Button
											variant="outline"
											onClick={() => {
												const newLink = addForm.getValues('externalLinks');
												newLink.push({ source: '', url: '' });
												addForm.setValue('externalLinks', newLink);
											}}
										>
											Добавить ссылку
										</Button>
									</div>
								</div>
							</div>

						</div>
						<div className="flex justify-end mt-6">
							<Button type="submit" disabled={createLoading}>
								{createLoading ? 'Создание...' : 'Добавить'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>
			{/* Модалка редактирования */}
			<Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
				<DialogContent className="max-w-7xl">
					<DialogHeader>
						<DialogTitle>Редактировать аниме</DialogTitle>
					</DialogHeader>
					<form onSubmit={editForm.handleSubmit(onEditSubmit)}>
						<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
							{/* Колонка 1: Основные данные */}
							<div>
								<div>
									<Label>Shikimori ID</Label>
									<Input {...editForm.register('shikimoriId', { required: true })} readOnly />
								</div>
								<div>
									<Label>Название (RU)</Label>
									<Input {...editForm.register('titleRU', { required: true })} />
								</div>
								<div>
									<Label>Тип</Label>
									<Controller
										control={editForm.control}
										name="kind"
										render={({ field }) => (
											<ReactSelect
												options={kindOptions}
												value={field.value ? kindOptions.find(opt => opt.value === field.value) : null}
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
												value={field.value ? ratingOptions.find(opt => opt.value === field.value) : null}
												onChange={(selected) => field.onChange(selected?.value)}
												placeholder="Выберите рейтинг"
											/>
										)}
									/>
								</div>
								<div>
									<Label>Количество эпизодов</Label>
									<Input type="number" {...editForm.register('episodes', { valueAsNumber: true })} />
								</div>
								<div>
									<Label>Продолжительность (мин)</Label>
									<Input type="number" {...editForm.register('duration', { valueAsNumber: true })} />
								</div>
								<div>
									<Label>Дата начала</Label>
									<Input type="date" {...editForm.register('startDate')} />
								</div>
								<div>
									<Label>Дата окончания</Label>
									<Input type="date" {...editForm.register('endDate')} />
								</div>
								<div>
									<Label>Обложки</Label>
									<div className="grid grid-cols-2 gap-4">
										<div>
											<Label>Extra Large</Label>
											<Input {...editForm.register('coverImage.extraLarge')} placeholder="URL" />
											{editForm.watch('coverImage.extraLarge') && (
												<Image
													src={editForm.watch('coverImage.extraLarge')}
													alt="Обложка"
													width={200}
													height={300}
													className="mt-2 object-cover rounded-md"
												/>
											)}
										</div>
										<div>
											<Label>Banner</Label>
											<Input {...editForm.register('coverImage.banner')} placeholder="URL" />
											{editForm.watch('coverImage.banner') && (
												<Image
													src={editForm.watch('coverImage.banner')}
													alt="Баннер"
													width={400}
													height={200}
													className="mt-2 object-cover rounded-md"
												/>
											)}
										</div>
									</div>
								</div>
							</div>

							{/* Колонка 2: Категории и связи */}
							<div>
								<div>
									<Label>Жанры</Label>
									<Controller
										control={editForm.control}
										name="genres"
										render={({ field }) => (
											<ReactSelect
												isMulti
												options={genreOptions}
												value={field.value?.map(v => genreOptions.find(opt => opt.value === v)) || []}
												onChange={(selected) => field.onChange(selected?.map(opt => opt.value))}
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
												value={field.value?.map(v => ({ value: v, label: v })) || []}
												onChange={(selected) => field.onChange(selected?.map(opt => opt.value))}
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
												value={field.value?.map(v => studioOptions.find(opt => opt.value === v)) || []}
												onChange={(selected) => field.onChange(selected?.map(opt => opt.value))}
												placeholder="Выберите студии"
											/>
										)}
									/>
								</div>
								<div>
									<Label>Статус</Label>
									<Controller
										control={editForm.control}
										name="status"
										render={({ field }) => (
											<ReactSelect
												options={statusOptions} // Добавьте запрос для получения статусов
												value={field.value.RU ? statusOptions.find(opt => opt.value === field.value.RU) : null}
												onChange={(selected) => {
													field.onChange({ EN: selected?.label, RU: selected?.value });
												}}
												placeholder="Выберите статус"
											/>
										)}
									/>
								</div>
							</div>

							{/* Колонка 3: Описание и медиа */}
							<div>
								<div>
									<Label>Описание (RU)</Label>
									<Textarea {...editForm.register('description.RU')} />
								</div>
								<div>
									<Label>Описание (EN)</Label>
									<Textarea {...editForm.register('description.EN')} />
								</div>
								<div>
									<Label>Внешние ссылки</Label>
									<div className="space-y-2">
										{editForm.watch('externalLinks').map((_, index) => (
											<div key={index} className="flex gap-2">
												<Input placeholder="Источник" {...editForm.register(`externalLinks[${index}].source`)} />
												<Input placeholder="URL" {...editForm.register(`externalLinks[${index}].url`)} />
												<Button
													variant="outline"
													onClick={() => {
														const links = editForm.getValues('externalLinks');
														links.splice(index, 1);
														editForm.setValue('externalLinks', links);
													}}
												>
													Удалить
												</Button>
											</div>
										))}
										<Button
											variant="outline"
											onClick={() => {
												const newLink = editForm.getValues('externalLinks');
												newLink.push({ source: '', url: '' });
												editForm.setValue('externalLinks', newLink);
											}}
										>
											Добавить ссылку
										</Button>
									</div>
								</div>

							</div>
						</div>
						<div className="flex justify-end mt-6">
							<Button type="submit" disabled={updateLoading}>
								{updateLoading ? 'Сохранение...' : 'Сохранить изменения'}
							</Button>
						</div>
					</form>
				</DialogContent>
			</Dialog>		</div>
	)
}
