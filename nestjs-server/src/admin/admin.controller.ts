import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common'

import { Authorization } from '@/auth/decorators/auth.decorator'

import { AdminService } from './admin.service'

@Controller('admin')
export class AdminController {
	constructor(private readonly adminService: AdminService) {}
	@HttpCode(HttpStatus.OK)
	@Get('users')
	@Authorization('ADMIN')
	public async findUsers() {
		return this.adminService.getUsers()
	}
}
