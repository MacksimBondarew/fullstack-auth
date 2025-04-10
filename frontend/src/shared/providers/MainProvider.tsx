'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider, ThemeProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
			<ThemeProvider
				attribute='class'
				defaultTheme='system'
				disableTransitionOnChange
				storageKey='fullstack-theme'
			>
				{children}
			</ThemeProvider>
		</TanstackQueryProvider>
	)
}
