import { getCurrentUser } from '@/lib/auth'
import { getProjects } from '@/lib/db'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ProjectsList from '@/components/projects/list'
import CreateProjectDialog from '@/components/projects/create-dialog'

export default async function ProjectsPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    )
  }

  const isDeveloper = currentUser.roles?.some((ur: any) => ur.role?.name === 'developer') || currentUser.requestedRole === 'developer'
  const rawProjects = isDeveloper ? await getProjects() : await getProjects(currentUser.id)

  const { generateMockData } = await import('@/lib/mock-data')
  const isDemo = true
  const mock = generateMockData()
  const projects = isDemo ? mock.mockProjects : rawProjects

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Projects</h1>
            <p className="text-slate-400 font-medium">
              Create and manage your workspace projects
            </p>
          </div>
          <div className="self-start md:self-auto relative z-20">
            <CreateProjectDialog userId={currentUser.id} />
          </div>
        </div>
      </div>

      {projects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-900/30 border border-slate-800/60 rounded-3xl backdrop-blur-xl shadow-xl text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"/></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No projects yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Get started by creating your first project to organize tasks and collaborate with your team.
          </p>
        </div>
      ) : (
        <ProjectsList projects={projects} />
      )}
    </div>
  )
}
