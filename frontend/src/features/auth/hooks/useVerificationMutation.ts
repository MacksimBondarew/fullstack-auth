import { useMutation } from '@tanstack/react-query'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import { verificationService } from '../services'

export function useVerificationMutation() {
	const router = useRouter()

	const { mutate: verification } = useMutation({
		mutationKey: ['new verification'],
		mutationFn: (token: string | null) =>
			verificationService.newVerification(token),
		onSuccess() {
			toast.success('The email has been confirmed.')
			router.push('/dashboard/settings')
		},
		onError() {
            toast.error("The email hasn't been confirmed.")
			router.push('/auth/login')
		}
	})

	return { verification }
}
