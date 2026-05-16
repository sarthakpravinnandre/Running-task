'use client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import ThreeScene from '@/components/landing/three-scene'


type UserRole = 'admin' | 'manager' | 'project_lead' | 'team_lead' | 'developer'

export default function Page() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [repeatPassword, setRepeatPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<UserRole>('developer')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    if (password !== repeatPassword) {
      setError('Passwords do not match')
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
          requested_role: selectedRole,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to register')
      }

      router.push('/auth/login?message=check-email')
    } catch (error: any) {
      setError(error.message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen w-full bg-[#020617] text-slate-50 font-sans selection:bg-indigo-500/30 relative">
      <ThreeScene />
      {/* Left side: branding/visual */}
      <div className="hidden lg:flex w-[45%] flex-col justify-between p-12 relative overflow-hidden border-r border-slate-800/30 backdrop-blur-sm bg-slate-950/20">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-600/10 via-purple-700/5 to-transparent z-0"></div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center shadow-lg">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">TaskManager</span>
          </div>
          <h1 className="text-5xl lg:text-6xl font-extrabold leading-[1.1] tracking-tight mt-20 max-w-xl text-white">
            Streamline your workflow with precision.
          </h1>
          <p className="text-indigo-100/70 mt-6 text-lg max-w-md leading-relaxed font-medium">
            Join thousands of teams who have transformed their productivity and project management experience.
          </p>
        </div>
        
        <div className="relative z-10 flex items-center gap-4">
          <div className="flex -space-x-3">
            {[1, 2, 3, 4].map((i) => (
              <img key={i} className="w-10 h-10 rounded-full border-2 border-indigo-900 object-cover" src={`https://i.pravatar.cc/100?img=${i+10}`} alt="User avatar" />
            ))}
          </div>
          <p className="text-sm text-indigo-200/80 font-medium">Trusted by 10k+ users</p>
        </div>
      </div>

      {/* Right side: Form */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-12 relative overflow-hidden">
        {/* Mobile background effect */}
        <div className="absolute inset-0 lg:hidden bg-[#0a0a0b]"></div>
        <div className="absolute top-1/4 right-1/4 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[100px] lg:hidden"></div>

        <div className="w-full max-w-[420px] relative z-10">
          <div className="mb-10 text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-3 text-white">Create an account</h2>
            <p className="text-slate-400 text-base">Enter your details below to get started</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
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
              <Label htmlFor="password" className="text-slate-300 font-medium">Password</Label>
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
            <div className="space-y-2">
              <Label htmlFor="repeat-password" className="text-slate-300 font-medium">Confirm Password</Label>
              <Input
                id="repeat-password"
                type="password"
                placeholder="••••••••"
                required
                value={repeatPassword}
                onChange={(e) => setRepeatPassword(e.target.value)}
                className="bg-slate-900/50 border-slate-800 text-slate-100 placeholder:text-slate-600 focus-visible:ring-indigo-500 h-12 px-4 rounded-xl transition-all"
              />
            </div>
            <div className="space-y-2 pt-1">
              <Label htmlFor="role" className="text-slate-300 font-medium">Select Your Role</Label>
              <Select value={selectedRole} onValueChange={(value) => setSelectedRole(value as UserRole)}>
                <SelectTrigger id="role" className="bg-slate-900/50 border-slate-800 text-slate-100 focus:ring-indigo-500 h-12 px-4 rounded-xl">
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent className="bg-slate-900 border-slate-800 text-slate-100 rounded-xl">
                  <SelectItem value="developer" className="focus:bg-slate-800 focus:text-slate-100 py-2.5">Developer</SelectItem>
                  <SelectItem value="team_lead" className="focus:bg-slate-800 focus:text-slate-100 py-2.5">Team Lead</SelectItem>
                  <SelectItem value="project_lead" className="focus:bg-slate-800 focus:text-slate-100 py-2.5">Project Lead</SelectItem>
                  <SelectItem value="manager" className="focus:bg-slate-800 focus:text-slate-100 py-2.5">Manager</SelectItem>
                  <SelectItem value="admin" className="focus:bg-slate-800 focus:text-slate-100 py-2.5">Admin</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-[12px] text-slate-500 mt-2">
                Your role selection will be reviewed by an administrator.
              </p>
            </div>
            
            {error && (
              <div className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/></svg>
                {error}
              </div>
            )}
            
            <Button 
              type="submit" 
              className="w-full h-12 mt-4 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all duration-300 hover:shadow-[0_0_20px_rgba(79,70,229,0.4)] font-medium text-base" 
              disabled={isLoading}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Creating account...
                </span>
              ) : 'Create account'}
            </Button>
          </form>

          <div className="mt-8 text-center text-sm text-slate-400">
            Already have an account?{' '}
            <Link
              href="/auth/login"
              className="font-medium text-indigo-400 hover:text-indigo-300 transition-colors underline underline-offset-4"
            >
              Log in instead
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
