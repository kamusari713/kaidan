'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts'
import { Container } from '@/components/layout'

export default function AdminDashboard() {
	// Фейковые данные
	const stats = {
		totalAnime: 985,
		activeUsers: 6,
		newComments: 14,
		avgScore: 8.7
	}

	const topAnime = [
		{ title: "Атака Титанов", score: 9.2, views: 17 },
		{ title: "Убийца Демонов", score: 8.9, views: 5 },
		{ title: "Мой герой Академия", score: 8.7, views: 12 },
		{ title: "Однажды в море", score: 8.6, views: 19 },
		{ title: "Драконий шар Супер", score: 8.5, views: 3 },
		{ title: "Полный металл алхимик", score: 9.1, views: 14 },
		{ title: "Заметки о смерти", score: 9.0, views: 8 },
		{ title: "Наруто", score: 8.8, views: 20 },
		{ title: "Токийский злодей", score: 8.4, views: 2 },
		{ title: "Космический боб", score: 9.3, views: 15 }
	]

	const genreData = [
		{ name: "Экшн", count: 50 },
		{ name: "Драмма", count: 25 },
		{ name: "Комедия", count: 20 },
		{ name: "Фэнтези", count: 20 },
		{ name: "Роматника", count: 18 },
		{ name: "Научное", count: 17 },
		{ name: "Хоррор", count: 12 },
		{ name: "Мистика", count: 11 },
		{ name: "Философия", count: 10 },
		{ name: "Повседневность", count: 9 }
	]

	// Функция для экспорта в CSV
	const exportToCSV = () => {
		// Сбор данных в сыром виде
		const csvRows = []

		// Заголовок
		csvRows.push("Статистика")
		Object.entries(stats).forEach(([key, value]) => {
			csvRows.push(`${key},${value}`)
		})

		// Пустая строка
		csvRows.push("")

		// Топ аниме
		csvRows.push("Топ-10 аниме")
		csvRows.push("Название,Рейтинг,Просмотры")
		topAnime.forEach(anime => {
			csvRows.push(`${anime.title},${anime.score},${anime.views}`)
		})

		// Пустая строка
		csvRows.push("")

		// Жанры
		csvRows.push("Распределение по жанрам")
		csvRows.push("Жанр,Количество")
		genreData.forEach(genre => {
			const escapedName = genre.name.includes(',') ? `"${genre.name}"` : genre.name
			csvRows.push(`${escapedName},${genre.count}`)
		})

		// Создание CSV
		const csvContent = csvRows.join("\r\n")
		const BOM = new Uint8Array([0xEF, 0xBB, 0xBF])
		const csvUint8 = new TextEncoder().encode(csvContent)
		const blob = new Blob([BOM, csvUint8], { type: 'text/csv;charset=utf-8;' })
		const url = URL.createObjectURL(blob)

		// Создание ссылки для скачивания
		const link = document.createElement("a")
		link.href = url
		link.setAttribute("download", "anime_dashboard_report.csv")
		document.body.appendChild(link)
		link.click()
		document.body.removeChild(link)
	}

	return (
		<Container className="p-6 space-y-6">
			<div className="flex justify-between items-center">
				<h1 className="text-3xl font-bold">Обзорная панель</h1>
				<Button
					onClick={exportToCSV}
					className="bg-green-600 hover:bg-green-700"
				>
					Выгрузить в CSV
				</Button>
			</div>

			{/* Основной интерфейс остается без изменений */}
			<div className="space-y-6">
				<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
					<Card>
						<CardContent className="p-4">
							<div className="text-sm text-muted-foreground mb-2">Всего аниме</div>
							<div className="text-xl font-bold">{stats.totalAnime}</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-sm text-muted-foreground mb-2">Активных пользователей</div>
							<div className="text-xl font-bold">{stats.activeUsers}</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-sm text-muted-foreground mb-2">Новых комментариев</div>
							<div className="text-xl font-bold">{stats.newComments}</div>
						</CardContent>
					</Card>
					<Card>
						<CardContent className="p-4">
							<div className="text-sm text-muted-foreground mb-2">Средний рейтинг</div>
							<div className="text-xl font-bold">{stats.avgScore}/10</div>
						</CardContent>
					</Card>
				</div>

				<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
					<Card>
						<CardHeader>
							<CardTitle>Топ-10 аниме по рейтингу</CardTitle>
						</CardHeader>
						<CardContent>
							<Table>
								<TableHeader>
									<TableRow>
										<TableHead>Название</TableHead>
										<TableHead>Рейтинг</TableHead>
										<TableHead>Просмотры</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{topAnime.map((anime) => (
										<TableRow key={anime.title}>
											<TableCell>{anime.title}</TableCell>
											<TableCell>{anime.score}</TableCell>
											<TableCell>{anime.views}</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</CardContent>
					</Card>

					<Card className="h-[400px] w-full">
						<CardHeader>
							<CardTitle>Распределение по жанрам</CardTitle>
						</CardHeader>
						<CardContent>
							<div className="text-sm">
								<BarChart width={500} height={300} data={genreData}>
									<CartesianGrid strokeDasharray="3 3" />
									<XAxis dataKey="name" />
									<YAxis />
									<Tooltip />
									<Legend />
									<Bar dataKey="count" fill="#ffb98a" />
								</BarChart>
							</div>
						</CardContent>
					</Card>
				</div>
			</div>
		</Container>
	)
}