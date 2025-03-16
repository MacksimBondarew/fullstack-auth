import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { Authorization } from '@/auth/decorators/auth.decorator'
import { Authorized } from '@/auth/decorators/authorized.decorator'

import { UserService } from './user.service'

@Controller('user')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@Get('profile')
	@Authorization()
	public async findPRofile(@Authorized('id') id: string) {
		return this.userService.findById(id)
	}
}
