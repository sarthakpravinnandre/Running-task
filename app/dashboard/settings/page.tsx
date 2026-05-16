import { getCurrentUser } from '@/lib/auth'
import UserSettingsForm from '@/components/settings/user-form'

export default async function SettingsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    )
  }

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Settings</h1>
            <p className="text-slate-400 font-medium">
              Manage your account preferences and profile details
            </p>
          </div>
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800/60 rounded-3xl p-8 backdrop-blur-xl shadow-xl relative overflow-hidden">
        <div className="absolute top-[-50px] left-[-50px] w-32 h-32 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <h2 className="text-2xl font-bold text-white mb-6 relative z-10">Profile Information</h2>
        <div className="relative z-10">
          <UserSettingsForm user={currentUser} />
        </div>
      </div>
    </div>
  )
}
