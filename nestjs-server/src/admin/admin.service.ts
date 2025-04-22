import { Injectable } from '@nestjs/common'

import { PrismaService } from '@/prisma/prisma.service'

@Injectable()
export class AdminService {
	public constructor(private readonly prismaService: PrismaService) {}
	public async getUsers() {
		return this.prismaService.user.findMany()
	}
}
