import { LoginForm } from "@/features/auth/components";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'login account'
}

export default function LoginPage() {
    return <LoginForm />
}