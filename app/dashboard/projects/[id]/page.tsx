import { getProjectById } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { 
  ArrowLeft, 
  Calendar, 
  Users, 
  CheckCircle2, 
  Clock, 
  MoreHorizontal,
  FolderGit2
} from 'lucide-react'

// Dummy project generator to handle the demo IDs
const generateDemoProject = (id: string) => {
  const isDemo = id.startsWith('demo-proj-');
  if (!isDemo && id !== '1' && id !== '2' && id !== '3') return null;

  return {
    id,
    name: 'Website Redesign & Migration',
    description: 'Comprehensive overhaul of the main corporate website including migrating the backend database to a new serverless architecture.',
    status: 'in_progress',
    createdAt: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    department: { name: 'Engineering' },
    owner: { firstName: 'Alex', lastName: 'Chen', email: 'alex@example.com' },
    teamMembers: [
      { user: { firstName: 'Sarah', lastName: 'Jenkins', email: 'sarah@example.com' } },
      { user: { firstName: 'Mike', lastName: 'Ross', email: 'mike@example.com' } },
      { user: { firstName: 'Elena', lastName: 'Rodriguez', email: 'elena@example.com' } }
    ],
    tasks: [
      { id: 't1', title: 'Design landing page mockup', priority: 'high', status: 'completed', assignee: { firstName: 'Sarah' } },
      { id: 't2', title: 'Setup serverless database', priority: 'critical', status: 'in_progress', assignee: { firstName: 'Alex' } },
      { id: 't3', title: 'Implement authentication', priority: 'high', status: 'todo', assignee: null },
      { id: 't4', title: 'Write API documentation', priority: 'medium', status: 'todo', assignee: { firstName: 'Mike' } }
    ]
  };
}

export default async function ProjectDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  // Try to get from database first
  let project = await getProjectById(id);
  let tasks = [];
  
  // If not found, check if it's a demo project
  if (!project) {
    const demoProject = generateDemoProject(id);
    if (!demoProject) {
      notFound();
    }
    project = demoProject as any;
    tasks = demoProject.tasks as any;
  } else {
    // If real project, we would fetch tasks via getTasks(params.id) 
    // but getProjectById might not include tasks natively depending on schema.
    // For now we'll assume it doesn't and just use empty array for real projects 
    // unless we query getTasks.
    const { getTasks } = await import('@/lib/db');
    tasks = await getTasks(id);
  }

  const completedTasks = tasks.filter(t => t.status === 'completed').length;
  const progress = tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : 0;

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Navigation */}
      <Link href="/dashboard" className="inline-flex items-center gap-2 text-slate-400 hover:text-indigo-400 transition-colors font-medium">
        <ArrowLeft size={18} />
        Back to Dashboard
      </Link>

      {/* Project Header */}
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-start justify-between gap-6">
          <div className="flex gap-6">
            <div className="hidden sm:flex w-16 h-16 rounded-2xl bg-indigo-500/10 border border-indigo-500/20 items-center justify-center text-indigo-400 shadow-inner shrink-0">
              <FolderGit2 size={32} strokeWidth={2} />
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">{project.name}</h1>
                <span className={`px-3 py-1 text-xs font-bold uppercase tracking-wider rounded-lg border ${
                  project.status === 'in_progress' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                  project.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                  'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {project.status.replace('_', ' ')}
                </span>
              </div>
              <p className="text-slate-400 text-lg max-w-2xl">{project.description || 'No description provided.'}</p>
              
              <div className="flex flex-wrap items-center gap-6 mt-6">
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <Calendar size={16} />
                  <span>Started {new Date(project.createdAt).toLocaleDateString()}</span>
                </div>
                {project.department && (
                  <div className="flex items-center gap-2 text-sm text-slate-500">
                    <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
                    <span>{project.department.name}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 text-sm text-slate-500">
                  <img src={`https://ui-avatars.com/api/?name=${project.owner?.firstName}+${project.owner?.lastName}&background=334155&color=fff`} className="w-5 h-5 rounded-full" alt="Owner" />
                  <span>{project.owner?.firstName} {project.owner?.lastName} (Owner)</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex gap-3 shrink-0">
            <button className="px-5 py-2.5 rounded-xl font-medium bg-slate-800 text-slate-200 hover:bg-slate-700 transition-colors border border-slate-700 shadow-sm">
              Edit Project
            </button>
            <button className="w-11 h-11 flex items-center justify-center rounded-xl bg-slate-800 text-slate-400 hover:bg-slate-700 hover:text-white transition-colors border border-slate-700 shadow-sm">
              <MoreHorizontal size={20} />
            </button>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-8 pt-8 border-t border-slate-800/60 relative z-10">
          <div className="flex justify-between items-end mb-2">
            <div>
              <h3 className="text-sm font-bold text-slate-300 uppercase tracking-wider mb-1">Project Progress</h3>
              <p className="text-xs text-slate-500">{completedTasks} of {tasks.length} tasks completed</p>
            </div>
            <span className="text-2xl font-black text-white">{progress}%</span>
          </div>
          <div className="h-3 w-full bg-slate-800/80 rounded-full overflow-hidden border border-slate-700/50 shadow-inner">
            <div 
              className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full transition-all duration-1000 ease-out relative overflow-hidden" 
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-white/20 w-full h-full animate-[shimmer_2s_infinite]"></div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* Tasks Section */}
        <div className="lg:col-span-2 space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <CheckCircle2 className="text-indigo-500" /> 
              Project Tasks
            </h2>
            <button className="text-sm font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-4 py-2 rounded-lg transition-colors">
              + Add Task
            </button>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl overflow-hidden shadow-xl backdrop-blur-xl">
            {tasks.length === 0 ? (
              <div className="p-12 text-center">
                <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-500">
                  <CheckCircle2 size={32} />
                </div>
                <h3 className="text-lg font-bold text-white mb-2">No tasks yet</h3>
                <p className="text-slate-500">Get started by creating your first task for this project.</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800/60">
                {tasks.map((task: any) => (
                  <div key={task.id} className="p-5 flex items-center gap-4 hover:bg-slate-800/30 transition-colors group cursor-pointer">
                    <button className={`flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center ${
                      task.status === 'completed' 
                        ? 'bg-emerald-500 border-emerald-500 text-white' 
                        : 'border-slate-600 group-hover:border-indigo-400'
                    }`}>
                      {task.status === 'completed' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
                    </button>
                    
                    <div className="flex-1 min-w-0">
                      <h3 className={`font-bold text-lg truncate transition-colors ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                        {task.title}
                      </h3>
                      <div className="flex items-center gap-3 mt-1">
                        <span className={`text-[10px] uppercase tracking-widest font-black flex items-center gap-1 ${
                          task.priority === 'critical' ? 'text-red-400' : 
                          task.priority === 'high' ? 'text-orange-400' : 
                          'text-slate-400'
                        }`}>
                          {task.priority === 'critical' && <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span>}
                          {task.priority === 'high' && <span className="w-1.5 h-1.5 rounded-full bg-orange-400"></span>}
                          {task.priority}
                        </span>
                      </div>
                    </div>

                    {task.assignee && (
                      <div className="flex items-center gap-2">
                        <img 
                          src={`https://ui-avatars.com/api/?name=${task.assignee.firstName}&background=4f46e5&color=fff`} 
                          alt="Assignee" 
                          className="w-8 h-8 rounded-full border-2 border-slate-800"
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Team Section */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-2">
              <Users className="text-blue-500" /> 
              Team Members
            </h2>
          </div>

          <div className="bg-slate-900/30 border border-slate-800/60 rounded-3xl p-6 shadow-xl backdrop-blur-xl">
            {project.teamMembers && project.teamMembers.length > 0 ? (
              <div className="space-y-4">
                {project.teamMembers.map((member: any, i: number) => (
                  <div key={i} className="flex items-center gap-3 p-2 rounded-xl hover:bg-slate-800/50 transition-colors">
                    <img 
                      src={`https://ui-avatars.com/api/?name=${member.user.firstName}+${member.user.lastName}&background=random&color=fff`} 
                      alt="Team Member" 
                      className="w-10 h-10 rounded-full"
                    />
                    <div>
                      <p className="font-bold text-slate-200">{member.user.firstName} {member.user.lastName}</p>
                      <p className="text-xs text-slate-500 truncate max-w-[150px]">{member.user.email}</p>
                    </div>
                  </div>
                ))}
                
                <button className="w-full mt-4 py-3 border-2 border-dashed border-slate-700 hover:border-slate-500 rounded-xl text-slate-400 hover:text-slate-300 font-bold transition-colors flex items-center justify-center gap-2">
                  <Users size={18} />
                  Manage Team
                </button>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-slate-500 mb-4">No team members assigned.</p>
                <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                  Add Members
                </button>
              </div>
            )}
          </div>
        </div>

      </div>
    </div>
  )
}
