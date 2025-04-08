import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { MainProvider } from '@/shared/providers'

import '@/shared/styles/globals.css'

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
				<MainProvider>{children}</MainProvider>
			</body>
		</html>
	)
}
