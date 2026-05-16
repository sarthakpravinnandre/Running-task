import { redirect } from 'next/navigation'
import DashboardNav from '@/components/dashboard/nav'
import { getCurrentUser } from '@/lib/auth'

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const user = await getCurrentUser()

  if (!user) {
    redirect('/auth/login')
  }

  // Check if user is approved
  const isAdmin = user.roles?.some((ur: any) => ur.role?.name === 'admin') || user.requestedRole === 'admin'
  const isDeveloper = user.roles?.some((ur: any) => ur.role?.name === 'developer') || user.requestedRole === 'developer'

  if (user.approvalStatus !== 'approved' && !isAdmin && !isDeveloper) {
    redirect('/pending-approval')
  }

  return (
    <div className="flex h-screen bg-[#0a0a0b] text-slate-50 font-sans selection:bg-indigo-500/30 overflow-hidden">
      {/* Global abstract background for the entire dashboard */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] bg-indigo-600/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-purple-600/10 rounded-full blur-[150px]" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.15] mix-blend-overlay" />
      </div>

      {/* Sidebar Navigation */}
      <DashboardNav />

      {/* Main Content Area */}
      <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden p-4 lg:p-6 lg:pl-0">
        <div className="flex-1 bg-slate-950/60 backdrop-blur-xl border border-slate-800/80 rounded-2xl shadow-2xl overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  )
}
