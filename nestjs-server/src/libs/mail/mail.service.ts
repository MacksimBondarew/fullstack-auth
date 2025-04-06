import { MailerService } from '@nestjs-modules/mailer'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { render } from '@react-email/components'

import { ConfirmationTemplate } from './templates/confirmation.template'
import { ResetPasswordTemplate } from './templates/reset-password'
import { TwoFactorAuthTemplate } from './templates/two-factor-auth.template'

@Injectable()
export class MailService {
	public constructor(
		private readonly mailerService: MailerService,
		private readonly configService: ConfigService
	) {}
	public async sendConfirmationEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(ConfirmationTemplate({ domain, token }))

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.sendMail(email, 'Confirmation email', html)
	}
	public async sendPasswordResetEmail(email: string, token: string) {
		const domain = this.configService.getOrThrow<string>('ALLOWED_ORIGIN')
		const html = await render(ResetPasswordTemplate({ domain, token }))

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.sendMail(email, 'Reset password', html)
	}
	public async sendTwoFactorTokenEmail(email: string, token: string) {
		const html = await render(TwoFactorAuthTemplate({ token }))

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return
		return this.sendMail(email, 'Подтверждение вашей личности', html)
	}
	private sendMail(email: string, subject: string, html: string) {
		return this.mailerService.sendMail({
			to: email,
			subject,
			html
		})
	}
}
