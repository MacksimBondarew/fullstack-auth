import {
	Body,
	Heading,
	Tailwind,
	Text
} from '@react-email/components';
import { Html } from '@react-email/html';
import * as React from 'react';

interface TwoFactorAuthTemplateProps {
	token: string;
}

export function TwoFactorAuthTemplate({ token }: TwoFactorAuthTemplateProps) {
	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Two Factor Authentication</Heading>
					<Text>Your verification code: <strong>{token}</strong></Text>
					<Text>
						PLease use this code to log in to your account.
					</Text>
					<Text>
						If you did not request this email you can safely ignore it.
					</Text>
				</Body>
			</Html>
		</Tailwind>
	);
}