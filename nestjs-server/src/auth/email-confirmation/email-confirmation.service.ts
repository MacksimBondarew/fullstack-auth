import { Injectable } from '@nestjs/common'
import { TokenType } from '@prisma/__generated__'
import { Request } from 'express'
import { v4 } from 'uuid'

import { PrismaService } from '@/prisma/prisma.service'

import { ConfirmationDto } from './dto/confirmation.dto'

@Injectable()
export class EmailConfirmationService {
	public constructor(private readonly prismaService: PrismaService) {}
	public async newVerificationToken(req: Request, dto: ConfirmationDto) {}
	private async generateVerificationToken(email: string) {
		const token = v4()
		const expiresIn = new Date(new Date().getTime() + 3600 * 1000)
		const existingToken = await this.prismaService.token.findFirst({
			where: {
				email,
				type: TokenType.VERIFICATION
			}
		})
		if (existingToken) {
			await this.prismaService.token.delete({
				where: {
					id: existingToken.id,
					type: TokenType.VERIFICATION
				}
			})
		}
		const verificationToken = await this.prismaService.token.create({
			data: {
				email,
				token,
				expiresIn,
				type: TokenType.VERIFICATION
			}
		})
		return verificationToken
	}
}
