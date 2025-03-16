/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
	CanActivate,
	ExecutionContext,
	ForbiddenException,
	Injectable
} from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { UserRole } from '@prisma/__generated__'

import { ROLES_KEY } from '../decorators/roles.decorator'

@Injectable()
export class RolesGuard implements CanActivate {
	public constructor(private readonly reflector: Reflector) {}
	public canActivate(context: ExecutionContext): boolean {
		const roles = this.reflector.getAllAndOverride<UserRole[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])
		// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
		const request = context.switchToHttp().getRequest()

		if (!roles) return true

		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		if (!roles.includes(request.user.role)) {
			throw new ForbiddenException(
				"You don't have access to this resource"
			)
		}

		return true
	}
}
