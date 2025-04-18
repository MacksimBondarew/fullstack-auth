import { api } from '@/shared/api'

import { TypeNewPasswordSchema, TypeResetPasswordSchema } from '../schemes'
import type { IAuthResponse } from '../types'

class PasswordRecoveryService {
	public async reset(body: TypeResetPasswordSchema, recaptcha?: string) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IAuthResponse>(
			'auth/password-recovery/reset',
			body,
			{
				headers
			}
		)

		return response
	}

	public async new(
		body: TypeNewPasswordSchema,
		token: string | null,
		recaptcha?: string
	) {
		const headers = recaptcha ? { recaptcha } : undefined

		const response = await api.post<IAuthResponse>(
			`auth/password-recovery/new/${token}`,
			body,
			{
				headers
			}
		)

		return response
	}
}

export const passwordRecoveryService = new PasswordRecoveryService()
