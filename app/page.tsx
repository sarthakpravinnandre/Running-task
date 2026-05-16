import { getServerSession } from "next-auth/next"
import { authOptions } from "@/lib/auth-options"
import { redirect } from 'next/navigation'
import LandingContent from '@/components/landing/landing-content'

export default async function HomePage() {
  const session = await getServerSession(authOptions)

  // If user is logged in, redirect to dashboard
  if (session?.user) {
    redirect('/dashboard')
  }

  return <LandingContent />
}
