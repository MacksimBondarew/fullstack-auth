import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class UpdateUserDto {
	@IsString({ message: 'Name is not string.' })
	@IsNotEmpty({ message: 'Name is required.' })
	name: string

	@IsString({ message: 'Email is not string.' })
	@IsEmail({}, { message: 'Email is not correct.' })
	@IsNotEmpty({ message: 'Email is required.' })
	email: string

	@IsBoolean({ message: 'isTwoFactorEnabled must be a boolean.' })
	isTwoFactorEnabled: boolean
}
