'use client'

import { zodResolver } from '@hookform/resolvers/zod'
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

import {
	LoginSchema,
	TypeLoginSchema,
} from '../schemes'

import { AuthWrapper } from './index'

export function LoginForm() {
	const form = useForm<TypeLoginSchema>({
		resolver: zodResolver(LoginSchema),
		defaultValues: {
			email: '',
			password: ''
		}
	})
	const onSubmit = (data: TypeLoginSchema) => {
		console.log(data)
	}
	return (
		<AuthWrapper
			heading='Login'
			description='If you want to login, please fill in the form below.'
			backButtonLabel='If you want to create an account, go to registration'
			backButtonHref='/auth/register'
			isShowSocial
		>
			<Form {...form}>
				<form
					onSubmit={form.handleSubmit(onSubmit)}
					className='grid gap-2 space-y-2'
				>
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
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<Button type='submit' className='w-full'>
						Create an account
					</Button>
				</form>
			</Form>
		</AuthWrapper>
	)
}
