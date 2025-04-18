import { z } from 'zod'

export const ResetPasswordSchema = z.object({
	email: z.string().email({
		message: 'invalid email'
	})
})

export type TypeResetPasswordSchema = z.infer<typeof ResetPasswordSchema>