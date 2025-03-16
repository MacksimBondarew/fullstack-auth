/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createParamDecorator, ExecutionContext } from '@nestjs/common'
import { User } from '@prisma/__generated__'

export const Authorized = createParamDecorator(
	(data: keyof User, ctx: ExecutionContext) => {
		// @typescript-eslint/no-unsafe-assignment
		const request = ctx.switchToHttp().getRequest()
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		const user = request.user

		// eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access
		return data ? user[data] : user
	}
)
