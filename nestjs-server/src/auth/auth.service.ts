import {
	ConflictException,
	Injectable,
	InternalServerErrorException,
	NotFoundException,
	UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { AuthMethod, User } from '@prisma/__generated__'
import { verify } from 'argon2'
import { Request, Response } from 'express'

import { PrismaService } from '@/prisma/prisma.service'
import { UserService } from '@/user/user.service'

import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'
import { EmailConfirmationService } from './email-confirmation/email-confirmation.service'
import { ProviderService } from './provider/provider.service'

@Injectable()
export class AuthService {
	public constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService,
		private readonly providerService: ProviderService,
		private readonly prismaService: PrismaService,
		private readonly emailConfirmationService: EmailConfirmationService
	) {}
	public async register(req: Request, dto: RegisterDto) {
		const isExists = await this.userService.findByEmail(dto.email)
		if (isExists) {
			throw new ConflictException('User already exists')
		}
		const newUser = await this.userService.create(
			dto.email,
			dto.password,
			dto.name,
			null,
			AuthMethod.CREDENTIALS,
			false
		)
		await this.emailConfirmationService.sendVerificationToken(newUser.email)
		console.log('newUser', newUser)
		return {
			messege:
				'You are successfully registered. Please confirm your email'
		}
	}
	public async login(req: Request, dto: LoginDto) {
		const user = await this.userService.findByEmail(dto.email)
		if (!user || !user.password) {
			throw new NotFoundException('User not found')
		}
		const isValidPassword = await verify(user.password, dto.password)
		if (!isValidPassword) {
			throw new UnauthorizedException('Password is incorrect')
		}
		if (!user.isVerified) {
			await this.emailConfirmationService.sendVerificationToken(
				user.email
			)
			throw new UnauthorizedException(
				'Email is not confirmed. Please check your email and confirm it.'
			)
		}
		return this.saveSession(req, user)
	}

	public async extractProfileFromCode(
		req: Request,
		provider: string,
		code: string
	) {
		const providerInstance = this.providerService.findByService(provider)
		const profile = await providerInstance.findUserByCode(code)

		const account = await this.prismaService.account.findFirst({
			where: {
				id: profile.id,
				provider: profile.provider
			}
		})

		let user = account?.userId
			? await this.userService.findById(account.userId)
			: null

		if (user) {
			return this.saveSession(req, user)
		}

		user = await this.userService.create(
			profile.email,
			'',
			profile.name,
			profile.picture,
			AuthMethod[profile.provider.toUpperCase()],
			true
		)

		if (!account) {
			await this.prismaService.account.create({
				data: {
					userId: user.id,
					type: 'oauth',
					provider: profile.provider,
					accessToken: profile.access_token,
					refreshToken: profile.refresh_token,
					expiresAt: profile.expires_at
				}
			})
		}

		return this.saveSession(req, user)
	}

	public async logout(req: Request, res: Response): Promise<void> {
		return new Promise((resolve, reject) => {
			req.session.destroy(error => {
				if (error) {
					reject(new InternalServerErrorException("Can't logout"))
				} else {
					res.clearCookie(
						this.configService.getOrThrow<string>('SESSION_NAME')
					)
					resolve()
				}
			})
		})
	}
	public saveSession(req: Request, user: User) {
		return new Promise((resolve, reject) => {
			req.session.userId = user.id
			req.session.save(error => {
				if (error) {
					reject(
						new InternalServerErrorException("Can't save session")
					)
				} else {
					resolve({ user })
				}
			})
		})
	}
}
