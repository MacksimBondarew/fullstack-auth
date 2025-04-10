import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'login account'
}

export default function LoginPage() {
    return (
        <div className='space-y-5 text-center'>
            <h1 className='text-4xl font-bold'>Login Page</h1>
        </div>
    )
}