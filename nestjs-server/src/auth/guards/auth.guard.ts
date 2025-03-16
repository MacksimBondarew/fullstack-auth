import {
	CanActivate,
	ExecutionContext,
	Injectable,
	UnauthorizedException
} from '@nestjs/common'

import { UserService } from '@/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
	public constructor(private readonly userService: UserService) {}
	public async canActivate(context: ExecutionContext): Promise<boolean> {
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const request = context.switchToHttp().getRequest()

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (typeof request.session.userId === 'undefined') {
			throw new UnauthorizedException(
				'You must be logged in to perform this action'
			)
		}
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
		const user = await this.userService.findById(request.session.userId)

		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		request.user = user

		return true
	}
}
