'use client'

import { useSearchParams } from 'next/navigation'
import { useEffect } from 'react'

import { Loading } from '@/shared/components/ui'

import { useVerificationMutation } from '../hooks'

import { AuthWrapper } from './index'

export function NewVerificationForm() {
	const searchParams = useSearchParams()
	const token = searchParams.get('token')

	const { verification } = useVerificationMutation()

	useEffect(() => {
		verification(token)
        console.log("token")
	}, [token])

	return (
		<AuthWrapper heading='Подтверждение почты'>
			<div>
				<Loading />
			</div>
		</AuthWrapper>
	)
}
