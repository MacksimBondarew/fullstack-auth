import type { Metadata } from 'next'

import { ResetPasswordForm } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'Reset password'
}

export default function NewVerificationPage() {
	return <ResetPasswordForm />
}
