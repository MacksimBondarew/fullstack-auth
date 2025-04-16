import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'

import { toastMessageHandler } from '@/shared/utils'

import { TypeRegisterSchema } from '../schemes'
import { authService } from '../services'

export function useRegisterMutation() {
	const { mutate: register, isPending: isLoadingRegister } = useMutation({
		mutationKey: ['register user'],
		mutationFn: ({
			values,
			recaptcha
		}: {
			values: TypeRegisterSchema
			recaptcha: string
		}) => authService.register(values, recaptcha),
		onSuccess() {
			toast.success("You've successfully registered", {
				description:
					"Please confirm your email, we've sent you a confirmation link."
			})
		},
		onError(error) {
			toastMessageHandler(error)
		}
	})

	return { register, isLoadingRegister }
}
