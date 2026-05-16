'use client'

import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useSession } from 'next-auth/react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { FolderGit2, Users, Calendar, ArrowRight } from 'lucide-react'

export default function ProjectsList({ projects }: { projects: any[] }) {
  const { data: session } = useSession()
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  // @ts-ignore
  const userRole = session?.user?.role || 'user'
  const userId = session?.user?.id

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'planning':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'in_progress':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20'
      case 'on_hold':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'cancelled':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  const handleJoinProject = async (e: React.MouseEvent, projectId: string) => {
    e.preventDefault()
    e.stopPropagation()
    setLoadingId(projectId)

    try {
      const response = await fetch(`/api/projects/${projectId}/join`, {
        method: 'POST',
      })

      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error('Error joining project:', error)
    } finally {
      setLoadingId(null)
    }
  }

  return (
    <div className="grid gap-6">
      {projects.map((project: any) => {
        const isMember = project.teamMembers?.some((m: any) => m.userId === userId) || project.ownerId === userId
        const canJoin = userRole === 'developer' && !isMember

        return (
          <Link key={project.id} href={`/dashboard/projects/${project.id}`} className="group block">
            <div className="p-6 md:p-8 bg-slate-900/40 border border-slate-800/60 rounded-3xl hover:bg-slate-800/50 hover:border-slate-700 hover:shadow-2xl hover:shadow-indigo-500/5 transition-all duration-300 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              
              <div className="relative z-10">
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4 mb-4">
                  <div className="flex gap-4 items-start">
                    <div className="w-12 h-12 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-400 group-hover:text-indigo-400 group-hover:border-indigo-500/30 transition-colors shrink-0 shadow-inner">
                      <FolderGit2 size={24} strokeWidth={2} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1 group-hover:text-indigo-300 transition-colors">{project.name}</h3>
                      {project.department && (
                        <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-indigo-500"></span>
                          {project.department.name}
                        </p>
                      )}
                    </div>
                  </div>
                  
                  <div className="flex flex-wrap gap-3 items-center self-start">
                    {canJoin && (
                      <button
                        className="px-4 py-1.5 rounded-lg text-sm font-bold bg-indigo-600 hover:bg-indigo-500 text-white transition-colors shadow-lg shadow-indigo-500/20"
                        onClick={(e) => handleJoinProject(e, project.id)}
                        disabled={loadingId === project.id}
                      >
                        {loadingId === project.id ? 'Joining...' : 'Accept Project'}
                      </button>
                    )}
                    <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${getStatusColor(project.status || 'planning')}`}>
                      {(project.status || 'planning').replace('_', ' ')}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-colors">
                      <ArrowRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
                    </div>
                  </div>
                </div>

                <div className="ml-0 md:ml-16">
                  {project.description && (
                    <p className="text-slate-400 text-sm md:text-base max-w-3xl mb-6 font-medium leading-relaxed">
                      {project.description}
                    </p>
                  )}
                  
                  <div className="flex flex-wrap items-center gap-6 pt-4 border-t border-slate-800/60">
                    <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                      <Users size={16} className="text-slate-600" />
                      <span><strong className="text-slate-300">{project.teamMembers?.length || 0}</strong> team members</span>
                    </div>
                    {project.endDate && (
                      <div className="flex items-center gap-2 text-sm text-slate-500 font-medium">
                        <Calendar size={16} className="text-slate-600" />
                        <span>Due: <strong className="text-slate-300">{new Date(project.endDate).toLocaleDateString()}</strong></span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
