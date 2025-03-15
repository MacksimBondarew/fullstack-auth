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

import { UserService } from '@/user/user.service'

import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
	public constructor(
		private readonly userService: UserService,
		private readonly configService: ConfigService
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
		return this.saveSession(req, newUser)
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
					console.log('logout')
					resolve()
				}
			})
		})
	}
	private saveSession(req: Request, user: User) {
		return new Promise((resolve, reject) => {
			req.session.userId = user.id
			console.log(req.session)
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
