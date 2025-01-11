import axios from 'axios'

export const USERS_INSTANCE = axios.create({
	baseURL: 'http://localhost:8080/api/users',
	withCredentials: true,
	headers: {
		'Content-Type': 'application/json',
	},
})

export const getAll = async () => {
	return await USERS_INSTANCE.get('/all')
}
