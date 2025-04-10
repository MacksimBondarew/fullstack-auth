import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { MainProvider } from '@/shared/providers'
import '@/shared/styles/globals.css'
import { ToggleTheme } from '@/shared/components/ui'

export const metadata: Metadata = {
	title: 'FullStack Authorization',
	description: 'Website with FullStack Authorization'
}

const inter = Inter({
	subsets: ['latin']
})

export default function RootLayout({
	children
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<MainProvider>
					<div className='relative flex min-h-screen flex-col'>
						<ToggleTheme />
						<div className='flex h-screen w-full items-center justify-center px-4'>
							{children}
						</div>
					</div>
				</MainProvider>
			</body>
		</html>
	)
}
