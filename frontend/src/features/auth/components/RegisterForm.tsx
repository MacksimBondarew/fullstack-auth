'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useTheme } from 'next-themes'
import { useState } from 'react'
import ReCAPTCHA from 'react-google-recaptcha'
import { useForm } from 'react-hook-form'

import {
	Button,
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
	Input
} from '@/shared/components/ui'

import { RegisterSchema, TypeRegisterSchema } from '../schemes'

import { AuthWrapper } from './index'
import { toast } from 'sonner'
import { useRegisterMutation } from '../hooks/useRegisterMutations'

export function RegisterForm() {
	const { theme } = useTheme()
	const [recaptchaValue, setRecaptchaValue] = useState<string | null>(null)
	const form = useForm<TypeRegisterSchema>({
		resolver: zodResolver(RegisterSchema),
		defaultValues: {
			name: '',
			email: '',
			password: '',
			passwordRepeat: ''
		}
	})

const { register, isLoadingRegister } = useRegisterMutation()

	const onSubmit = (data: TypeRegisterSchema) => {
		if (recaptchaValue) {
			register({  values: data, recaptcha: recaptchaValue })
		} else {
			toast.error('Please verify that you are not a robot.')
		}
	}
	return (
		<AuthWrapper
			heading='Registration'
			description='If you want to create an account, please fill in the form below.'
			backButtonLabel='If you already have an account, go to login'
			backButtonHref='/auth/login'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
					<FormField
						control={form.control}
						name='name'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Name</FormLabel>
								<FormControl>
									<Input
										type='text'
										{...field}
										placeholder='John Doe'
										disabled={isLoadingRegister}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='email'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Email</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='email'
										placeholder='johndoe@example.com'
										disabled={isLoadingRegister}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='password'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='password'
										placeholder='*******'
										disabled={isLoadingRegister}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<FormField
						control={form.control}
						name='passwordRepeat'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Password Confirmation</FormLabel>
								<FormControl>
									<Input
										{...field}
										type='password'
										placeholder='*******'
										disabled={isLoadingRegister}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex justify-center'>
						<ReCAPTCHA
							sitekey={process.env.NEXT_PUBLIC_GOOGLE_RECAPTCHA_SITE_KEY as string}
							onChange={setRecaptchaValue}
							theme={theme === 'light' ? 'light' : 'dark'}
						/>
					</div>
					<Button type='submit' className='w-full'>
						Create an account
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
