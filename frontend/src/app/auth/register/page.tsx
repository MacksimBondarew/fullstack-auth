import { Metadata } from 'next'

import { RegisterForm } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'create account'
}

export default function LoginPage() {
	return <RegisterForm />
}
