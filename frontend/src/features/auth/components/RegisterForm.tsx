'use client'

import { Button } from '@/shared/components/ui'
import { AuthWrapper } from './index'

export function RegisterForm() {
	return (
		<AuthWrapper
			heading='Registration'
			description='If you want to create an account, please fill in the form below.'
			backButtonLabel='If you already have an account, go to login'
			backButtonHref='/auth/login'
			isShowSocial
		>
            <Button className='w-full'>Register</Button>
        </AuthWrapper>
	)
}
