import type { Metadata } from 'next'

import { NewVerificationForm } from '@/features/auth/components'

export const metadata: Metadata = {
	title: 'Confirm Email'
}

export default function NewVerificationPage() {
	return <NewVerificationForm />
}
