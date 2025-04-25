'use client'

import {
	Button,
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	Input,
	Label,
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui'
import { useBanUser, useCreateUser, useUpdateUser, useUsers } from '@/hooks/admin'
import { CreateUserFormData } from '@/types/form'
import { UserDTO } from '@/types/user'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

const roleOptions = [
	{ value: 'ROLE_ADMIN', label: 'Админ' },
	{ value: 'ROLE_USER', label: 'Пользователь' },
]

const AdminPage = () => {
	const [page, setPage] = useState(0)
	const [size] = useState(5)
	const [orderBy, setOrderBy] = useState('username')
	const [direction, setDirection] = useState(true)
	const [isRegisterOpen, setIsRegisterOpen] = useState(false)
	const [isUpdateOpen, setIsUpdateOpen] = useState(false)
	const [selectedUser, setSelectedUser] = useState<UserDTO | null>(null)

	const router = useRouter()

	const { usersData, isLoading, error } = useUsers(page, size, orderBy, direction)
	const users = usersData?.content || []
	const totalPages = usersData?.totalPages || 1
	const banMutation = useBanUser()
	const registerMutation = useCreateUser()
	const updateMutation = useUpdateUser()
	const registerForm = useForm<CreateUserFormData>()
	const updateForm = useForm<UserDTO>()

	const handleSort = (column: string) => {
		if (orderBy === column) {
			setDirection(!direction)
		} else {
			setOrderBy(column)
			setDirection(true)
		}
	}

	const handleBan = (userId: string, banned: boolean) => {
		banMutation.mutate({ userId, banned })
	}

	const onRegisterSubmit = (data: CreateUserFormData) => {
		registerMutation.mutate(data, {
			onSuccess: () => {
				setIsRegisterOpen(false)
				registerForm.reset()
			},
		})
	}

	const onUpdateSubmit = (data: UserDTO) => {
		if (selectedUser) {
			updateMutation.mutate(
				{ userId: selectedUser.id, updateData: { ...data, id: selectedUser.id, banned: selectedUser.banned } },
				{
					onSuccess: () => {
						setIsUpdateOpen(false)
						setSelectedUser(null)
						updateForm.reset()
					},
				}
			)
		}
	}

	useEffect(() => {
		if (selectedUser) {
			updateForm.reset({
				username: selectedUser.username,
				email: selectedUser.email,
				role: selectedUser.role,
				bio: selectedUser.bio.replace(/^["]|["]$/g, ''),
			})
		}
	}, [selectedUser, updateForm])

	if (isLoading) return <div className="p-4">Loading...</div>
	if (error) return <div className="p-4">Error: {error.message}</div>

	return (
		<div className="p-6">
			<h1 className="text-2xl font-bold mb-4">Админ панель - Пользователи</h1>

			{/* Pagination Controls */}
			<div className="my-4 flex items-center gap-4">
				<Button onClick={() => setIsRegisterOpen(true)}>Зарегестрировать нового пользователя</Button>
				<Button onClick={() => setPage((prev) => prev - 1)} disabled={page + 1 <= 1}>
					Пред.
				</Button>
				<span>
					Страница {page + 1} из {totalPages}
				</span>
				<Button onClick={() => setPage((prev) => prev + 1)} disabled={page + 1 >= totalPages}>
					След.
				</Button>
			</div>

			{/* User Table */}
			<Table>
				<TableHeader>
					<TableRow>
						<TableHead>ID</TableHead>
						<TableHead onClick={() => handleSort('username')} className="cursor-pointer">
							Имя {orderBy === 'username' && (direction ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('email')} className="cursor-pointer">
							Почта {orderBy === 'email' && (direction ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('role')} className="cursor-pointer">
							Роль {orderBy === 'role' && (direction ? '↑' : '↓')}
						</TableHead>
						<TableHead onClick={() => handleSort('banned')} className="cursor-pointer">
							Забанен {orderBy === 'banned' && (direction ? '↑' : '↓')}
						</TableHead>
						<TableHead>Действия</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{users.map((user: UserDTO) => (
						<TableRow key={user.id} className="hover:cursor-pointer hover:bg-primary/60" onClick={() => router.push(`/profile/${user.id}/titles`)}>
							<TableCell>{user.id}</TableCell>
							<TableCell>{user.username}</TableCell>
							<TableCell>{user.email}</TableCell>
							<TableCell>{user.role}</TableCell>
							<TableCell>{user.banned ? 'Да' : 'Нет'}</TableCell>
							<TableCell className="flex gap-2">
								<Button
									variant="outline"
									size="sm"
									onClick={(e) => {
										e.stopPropagation()
										setSelectedUser(user)
										setIsUpdateOpen(true)
									}}
								>
									Изменить
								</Button>
								<Button
									variant={user.banned ? 'default' : 'destructive'}
									size="sm"
									onClick={(e) => {
										e.stopPropagation()
										handleBan(user.id, !user.banned)
									}}
									disabled={banMutation.isPending}
								>
									{user.banned ? 'Разбанить' : 'Забанить'}
								</Button>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>

			{/* Register Modal */}
			<Dialog open={isRegisterOpen} onOpenChange={setIsRegisterOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Зарегестрировать пользователя</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label>Имя</Label>
							<Input {...registerForm.register('username', { required: true })} />
						</div>
						<div>
							<Label>Почта</Label>
							<Input type="email" {...registerForm.register('email', { required: true })} />
						</div>
						<div>
							<Label>Пароль</Label>
							<Input type="password" {...registerForm.register('password', { required: true })} />
						</div>
						<div>
							<Label>Роль</Label>
							<Select onValueChange={(value) => registerForm.setValue('role', value)} defaultValue={registerForm.watch('role')}>
								<SelectTrigger>
									<SelectValue placeholder="Выберите роль" />
								</SelectTrigger>
								<SelectContent>
									{roleOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<Button onClick={registerForm.handleSubmit(onRegisterSubmit)} disabled={registerMutation.isPending}>
							Загерестрировать
						</Button>
					</div>
				</DialogContent>
			</Dialog>

			{/* Update Modal */}
			<Dialog open={isUpdateOpen} onOpenChange={setIsUpdateOpen}>
				<DialogContent>
					<DialogHeader>
						<DialogTitle>Обновить пользователся</DialogTitle>
					</DialogHeader>
					<div className="space-y-4">
						<div>
							<Label>Имя</Label>
							<Input {...updateForm.register('username', { required: true })} />
						</div>
						<div>
							<Label>Почта</Label>
							<Input type="email" {...updateForm.register('email', { required: true })} />
						</div>
						<div>
							<Label>Роль</Label>
							<Select onValueChange={(value) => updateForm.setValue('role', value)} defaultValue={updateForm.watch('role')}>
								<SelectTrigger>
									<SelectValue placeholder="Выберите роль" />
								</SelectTrigger>
								<SelectContent>
									{roleOptions.map((option) => (
										<SelectItem key={option.value} value={option.value}>
											{option.label}
										</SelectItem>
									))}
								</SelectContent>
							</Select>
						</div>
						<div>
							<Label>Биография</Label>
							<Input {...updateForm.register('bio')} />
						</div>
						<Button onClick={updateForm.handleSubmit(onUpdateSubmit)} disabled={updateMutation.isPending}>
							Обновить
						</Button>
					</div>
				</DialogContent>
			</Dialog>
		</div>
	)
}

export default AdminPage
