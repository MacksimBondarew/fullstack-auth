import { z } from 'zod'

export const SettingsSchema = z.object({
	name: z.string().min(1, {
		message: 'invalid name'
	}),
	email: z.string().email({
		message: 'invalid email'
	}),
	isTwoFactorEnabled: z.boolean()
})

export type TypeSettingsSchema = z.infer<typeof SettingsSchema>