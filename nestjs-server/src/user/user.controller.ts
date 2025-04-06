import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Patch
} from '@nestjs/common'

import { Authorization } from '@/auth/decorators/auth.decorator'
import { Authorized } from '@/auth/decorators/authorized.decorator'

import { UpdateUserDto } from './dto/update-user.dto'
import { UserService } from './user.service'

@Controller('users')
export class UserController {
	constructor(private readonly userService: UserService) {}

	@HttpCode(HttpStatus.OK)
	@Get('profile')
	@Authorization()
	public async findPRofile(@Authorized('id') id: string) {
		return this.userService.findById(id)
	}
	@Authorization()
	@HttpCode(HttpStatus.OK)
	@Patch('profile')
	public async updateProfile(
		@Authorized('id') userId: string,
		@Body() dto: UpdateUserDto
	) {
		return this.userService.update(userId, dto)
	}
}
