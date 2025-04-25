import { getUsers } from '@/services/rest/admin'
import { PageableContent } from '@/types/pagination'
import { UserDTO } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

export const useUsers = (page: number, size: number, orderBy: string, direction: boolean) => {
	const {
		data: usersData,
		isLoading,
		error,
	} = useQuery<PageableContent<UserDTO>>({
		queryKey: ['users', page, size, orderBy, direction],
		queryFn: () => getUsers(page, size, orderBy, direction),
	})
	return { usersData, isLoading, error }
}
