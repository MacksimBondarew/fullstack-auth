import { Body, Heading, Link, Tailwind, Text } from "@react-email/components"
import { Html } from "@react-email/html"
import * as React from 'react'

interface ConfirmationTemplateProps {
	domain: string
	token: string
}

export function ConfirmationTemplate({
	domain,
	token
}: ConfirmationTemplateProps) {
	const confirmLink = `${domain}/auth/new-verification?token=${token}`

	return (
		<Tailwind>
			<Html>
				<Body className='text-black'>
					<Heading>Confirmation Email</Heading>
					<Text>
						Hi, thanks for signing up. Please confirm your email address by clicking the link below.
					</Text>
					<Link href={confirmLink}>Confirm email</Link>
					<Text>
						If you did not request this email you can safely ignore it.
					</Text>
				</Body>
			</Html>
		</Tailwind>
	)
}