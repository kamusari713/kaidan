import axios from 'axios'

export const API = axios.create({
	baseURL: 'http://localhost:8080/api',
	headers: {
		'X-Requested-With': 'XMLHttpRequest',
		'Content-Type': 'application/json',
		Accept: 'application/json',
	},
	withCredentials: true,
	xsrfCookieName: 'XSRF-TOKEN',
	withXSRFToken: true,
})
