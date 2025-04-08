'use client'

import { type PropsWithChildren } from 'react'

import { TanstackQueryProvider } from './index'

export function MainProvider({ children }: PropsWithChildren<unknown>) {
	return (
		<TanstackQueryProvider>
            {children}
		</TanstackQueryProvider>
	)
}
