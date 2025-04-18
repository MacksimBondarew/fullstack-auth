

import { Metadata } from 'next'

import { SettingsForm } from '@/features/user/components'

export const metadata: Metadata = {
	title: 'settings account'
}

export default function SettingPage() {
	return <SettingsForm />
}
