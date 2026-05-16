'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession, signOut } from 'next-auth/react'
import {
  LayoutDashboard,
  FolderOpen,
  CheckSquare,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  BarChart3,
  AlertCircle,
} from 'lucide-react'
import { useState } from 'react'

export default function DashboardNav() {
  const pathname = usePathname()
  const { data: session, status } = useSession()
  const [isOpen, setIsOpen] = useState(false)

  const loading = status === "loading"
  // @ts-ignore - session.user.role will be added via authOptions
  const userRole = session?.user?.role || 'developer'

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/auth/login' })
  }

  // Build nav items based on user role
  const getNavItems = () => {
    const baseItems = [
      { href: '/dashboard', label: 'Overview', icon: LayoutDashboard, roles: ['admin', 'manager', 'user', 'project_lead', 'team_lead', 'developer'] },
      { href: '/dashboard/projects', label: 'Projects', icon: FolderOpen, roles: ['admin', 'manager', 'user', 'project_lead', 'team_lead', 'developer'] },
      { href: '/dashboard/tasks', label: 'Tasks', icon: CheckSquare, roles: ['admin', 'manager', 'user', 'project_lead', 'team_lead', 'developer'] },
    ]

    const managerItems = [
      { href: '/dashboard/team', label: 'Team', icon: Users, roles: ['admin', 'manager'] },
      { href: '/dashboard/analytics', label: 'Analytics', icon: BarChart3, roles: ['admin', 'manager'] },
      { href: '/dashboard/compliance', label: 'Compliance', icon: AlertCircle, roles: ['admin', 'manager'] },
    ]

    const adminItems = [
      { href: '/dashboard/admin', label: 'Admin Panel', icon: Settings, roles: ['admin'] },
    ]

    const items = [
      ...baseItems,
      ...managerItems,
      ...adminItems,
      { href: '/dashboard/settings', label: 'Settings', icon: Settings, roles: ['admin', 'manager', 'user', 'project_lead', 'team_lead', 'developer'] },
    ]

    return items.filter((item) => item.roles.includes(userRole))
  }

  const navItems = getNavItems()
  const isActive = (href: string) => pathname === href || (pathname.startsWith(href) && href !== '/dashboard')

  return (
    <>
      <button
        className="fixed top-4 left-4 p-2 bg-slate-900/80 backdrop-blur border border-slate-800 rounded-xl lg:hidden z-50 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      <nav
        className={`fixed lg:relative left-0 top-0 h-screen w-[280px] bg-transparent flex flex-col transform transition-transform duration-300 ease-in-out lg:translate-x-0 z-40 ${
          isOpen ? 'translate-x-0 bg-[#0a0a0b]/95 backdrop-blur-xl border-r border-slate-800' : '-translate-x-full'
        }`}
      >
        <div className="flex-1 flex flex-col p-6 h-full">
          <div className="flex items-center gap-3 mb-10 mt-12 lg:mt-0 px-2">
            <div className="w-9 h-9 rounded-xl bg-indigo-500/20 border border-indigo-500/30 flex items-center justify-center shadow-[0_0_15px_rgba(79,70,229,0.2)]">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-400"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3"/></svg>
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">TaskManager</span>
          </div>

          <div className="space-y-1.5 flex-1">
            <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-4 px-2">Menu</div>
            {navItems.map((item) => {
              const Icon = item.icon
              const active = isActive(item.href)
              return (
                <Link key={item.href} href={item.href}>
                  <div
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                      active
                        ? 'bg-indigo-500/10 text-indigo-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-5 bg-indigo-500 rounded-r-full" />
                    )}
                    <Icon size={18} className={active ? 'text-indigo-400' : 'text-slate-500 group-hover:text-slate-300'} />
                    <span className="text-sm">{item.label}</span>
                  </div>
                </Link>
              )
            })}
          </div>

          <div className="mt-auto pt-6">
            <div className="p-3 rounded-2xl bg-slate-900/60 border border-slate-800/60 flex items-center gap-3 mb-4 transition-colors hover:bg-slate-900 cursor-pointer">
              <img 
                src={`https://ui-avatars.com/api/?name=${session?.user?.email || 'User'}&background=4f46e5&color=fff`} 
                alt="Avatar" 
                className="w-10 h-10 rounded-full bg-slate-800"
              />
              <div className="flex-1 overflow-hidden">
                <p className="text-sm font-medium text-slate-200 truncate">
                  {loading ? 'Loading...' : session?.user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-slate-500 capitalize truncate">{userRole}</p>
              </div>
            </div>

            <button
              onClick={handleLogout}
              className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-all"
            >
              <LogOut size={16} />
              <span>Log out</span>
            </button>
          </div>
        </div>
      </nav>

      {isOpen && (
        <div
          className="fixed inset-0 bg-[#0a0a0b]/80 backdrop-blur-sm lg:hidden z-30"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}
