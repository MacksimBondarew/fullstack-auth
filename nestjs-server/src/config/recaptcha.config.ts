/* eslint-disable @typescript-eslint/no-unsafe-return */
import { ConfigService } from '@nestjs/config'
import { GoogleRecaptchaModuleOptions } from '@nestlab/google-recaptcha'

import { isDev } from '@/libs/common/utils/is-dev.util'

export const getRecaptchaConfig = (
	configService: ConfigService
): GoogleRecaptchaModuleOptions => ({
	secretKey: configService.getOrThrow<string>('GOOGLE_RECAPTCHA_SECRET_KEY'),
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	response: req => req.headers.recaptcha,
	skipIf: isDev(configService)
})
