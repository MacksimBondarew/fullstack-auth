import {
	Body,
	Heading,
	Link,
	Tailwind,
	Text
} from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface ResetPasswordTemplateProps {
	domain: string;
	token: string;
}

/**
 * Генерирует шаблон письма для сброса пароля.
 * Ссылка для сброса формируется из домена и токена. Письмо информирует,
 * что ссылка действительна 1 час.
 * 
 * @param {ResetPasswordTemplateProps} props - Домен и токен для генерации ссылки.
 * @returns {JSX.Element} Сгенерированный шаблон письма.
 */
export function ResetPasswordTemplate({ domain, token }: ResetPasswordTemplateProps) {
	const resetLink = `${domain}/auth/new-password?token=${token}`;

	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Reset Password</Heading>
					<Text>
						Hi there, you have requested a password reset. Please click the link below to set a new password.
					</Text>
					<Link href={resetLink}>Confirm reset password</Link>
					<Text>
						If you did not request this email you can safely ignore it.
					</Text>
				</Body>
			</Html>
		</Tailwind>
	);
}