import { z } from 'zod'
import { MIN_PASSWORD_FIELD_CHARACTERS } from '../constants'

export const loginSchema = z.object({
	username: z.string().nonempty('Строка должна содержать не менее 1 символа'),
	password: z.string().nonempty('Строка должна содержать не менее 1 символа').min(4, `Пароль должен быть минимум ${MIN_PASSWORD_FIELD_CHARACTERS} символа`),
})

export type LoginFormData = z.infer<typeof loginSchema>

export const registerSchema = z.object({
	email: z.string().email(),
	username: z.string().nonempty('Строка должна содержать не менее 1 символа'),
	password: z.string().nonempty('Строка должна содержать не менее 1 символа').min(4, `Пароль должен быть минимум ${MIN_PASSWORD_FIELD_CHARACTERS} символа`),
})

export type RegisterFormData = z.infer<typeof registerSchema>
