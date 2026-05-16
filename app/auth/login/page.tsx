'use client'

import { signIn } from 'next-auth/react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import ThreeScene from '@/components/landing/three-scene'


function LoginContent() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const searchParams = useSearchParams()
  const message = searchParams.get('message')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      })

      if (result?.error) {
        setError("Invalid email or password")
      } else {
        router.push('/dashboard')
      }
    } catch (error: any) {
      setError('An error occurred during login')
    } finally {
      setIsLoading(false)
    }
  }

  const handleMagicLink = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const result = await signIn('email', {
        email,
        redirect: false,
        callbackUrl: '/dashboard',
      })

      if (result?.error) {
        setError(result.error)
      } else {
        router.push('/auth/verify-request')
      }
    } catch (error: any) {
      setError('Could not send magic link')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#020617] text-slate-50 font-sans selection:bg-indigo-500/30 relative">
      <ThreeScene />
      {/* Left side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden order-2 lg:order-1">
        {/* Mobile background effect */}
        <div className="absolute inset-0 lg:hidden bg-[#0a0a0b]"></div>
        <div className="absolute bottom-1/4 left-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] lg:hidden"></div>

        <div className="w-full max-w-[420px] relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">Welcome back</h2>
            <p className="text-slate-400 text-base">Enter your credentials to access your account</p>
          </div>

          {message === 'check-email' && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm flex items-start gap-3">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="shrink-0 mt-0.5"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
              <span>Account created successfully. Your access will be available after admin approval.</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-slate-300 font-medium">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-indigo-500 h-12 px-4 rounded-xl transition-all"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-indigo-500 h-12 px-4 rounded-xl transition-all"
              />
            </div>
            
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 mt-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] font-medium text-base" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Signing in...
                </span>
              ) : 'Sign In'}
            </Button>
          </form>

          <div className="mt-6 relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-[#0a0a0b] px-4 text-slate-500 font-medium tracking-wider">Or continue with</span>
            </div>
          </div>

          <div className="mt-6">
            <Button
              type="button"
              variant="outline"
              className="w-full h-12 bg-slate-900/50 border-slate-800 text-slate-300 hover:bg-slate-800 hover:text-white rounded-xl transition-all font-medium"
              disabled={isLoading}
              onClick={handleMagicLink}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
              Magic Link
            </Button>
            <p className="mt-3 text-[11px] text-slate-500 text-center px-4">
              We'll email you a magic link for a password-free sign in.
            </p>
          </div>

          <div className="mt-10 text-center text-sm text-slate-400">
            Don&apos;t have an account?{' '}
            <Link
              href="/auth/sign-up"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>

      {/* Right side: branding/visual */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between p-12 relative overflow-hidden border-l border-slate-800/30 backdrop-blur-sm bg-slate-950/20 order-1 lg:order-2">
        <div className="absolute inset-0 bg-gradient-to-tl from-indigo-900/10 via-slate-900/5 to-transparent z-0"></div>
        <div className="absolute top-1/4 right-0 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-[100px] z-0"></div>
        <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-purple-500/10 rounded-full blur-[120px] z-0"></div>
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay z-0"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-indigo-500/20 backdrop-blur-md border border-indigo-500/30 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">TaskManager</span>
          </div>
          
          <div className="mt-24 max-w-lg">
            <blockquote className="text-2xl font-medium leading-relaxed text-slate-300">
              "This platform completely changed how our engineering team delivers features. The built-in role management and analytics are unmatched."
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <img className="w-12 h-12 rounded-full border-2 border-slate-700 object-cover" src="https://i.pravatar.cc/100?img=33" alt="Sarah Connor" />
              <div>
                <p className="text-white font-semibold">Sarah Connor</p>
                <p className="text-slate-400 text-sm">VP of Engineering at TechFlow</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-[#0a0a0b]">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    }>
      <LoginContent />
    </Suspense>
  )
}
