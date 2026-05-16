import { getCurrentUser } from '@/lib/auth'
import { getProjects, getTasks } from '@/lib/db'
import Link from 'next/link'
import { 
  FolderGit2, 
  CheckCircle2, 
  Clock, 
  Activity,
  ArrowUpRight,
  MoreHorizontal,
  BarChart2,
  PieChart as PieChartIcon
} from 'lucide-react'
import { ActivityChart, TaskStatusChart } from '@/components/dashboard/overview-charts'
import { generateMockData } from '@/lib/mock-data'

export default async function DashboardPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    )
  }

  const rawProjects = await getProjects(currentUser.id)
  const rawTasks = await getTasks(undefined, currentUser.id)

  // Force demo data as requested by user
  const isDemo = true
  const mock = generateMockData()

  // Use dynamic mock data if empty, else use real data
  const displayTotalProjects = isDemo ? mock.totalProjects : rawProjects.length;
  const displayActiveProjects = isDemo ? mock.activeProjects : rawProjects.filter((p: any) => p.status === 'in_progress').length;
  const displayActiveTasks = isDemo ? mock.activeTasks : rawTasks.filter((t: any) => t.status !== 'completed').length;
  const displayCompletedTasks = isDemo ? mock.completedTasks : rawTasks.filter((t: any) => t.status === 'completed').length;
  const displayTotalTasks = isDemo ? mock.totalTasks : rawTasks.length;
  
  const displayProjects = isDemo ? mock.mockProjects : rawProjects;
  const displayTasks = isDemo ? mock.mockTasks : rawTasks;

  const stats = [
    { label: 'Total Projects', value: displayTotalProjects, icon: FolderGit2, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Active Projects', value: displayActiveProjects, icon: Activity, color: 'text-indigo-400', bg: 'bg-indigo-400/10' },
    { label: 'Pending Tasks', value: displayActiveTasks, icon: Clock, color: 'text-orange-400', bg: 'bg-orange-400/10' },
    { label: 'Completed Tasks', value: displayCompletedTasks, icon: CheckCircle2, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
  ]

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-indigo-900/50 via-purple-900/30 to-slate-900 border border-slate-800/60 p-8 md:p-10 shadow-2xl">
        <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-500/20 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div>
            {isDemo && (
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-bold tracking-wider uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
                </span>
                Demo Workspace
              </div>
            )}
            <h1 className="text-3xl md:text-5xl font-extrabold text-white mb-3 tracking-tight">
              Welcome back, {currentUser.profile?.first_name || currentUser.email?.split('@')[0] || 'User'}!
            </h1>
            <p className="text-indigo-200/80 text-lg max-w-xl font-medium">
              Here&apos;s your workspace overview. You have <span className="text-indigo-400 font-bold">{displayActiveTasks} pending tasks</span> across <span className="text-indigo-400 font-bold">{displayActiveProjects} active projects</span>.
            </p>
          </div>
          <button className="flex items-center justify-center gap-2 bg-indigo-500 text-white px-6 py-3 rounded-xl font-medium hover:bg-indigo-600 transition-all duration-300 shadow-[0_0_20px_rgba(79,70,229,0.3)] hover:shadow-[0_0_25px_rgba(79,70,229,0.5)] hover:-translate-y-0.5 self-start md:self-auto group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-90"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            New Project
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {stats.map((stat, i) => {
          const Icon = stat.icon
          return (
            <div key={i} className="group p-6 rounded-2xl bg-slate-900/40 border border-slate-800/60 backdrop-blur-xl hover:bg-slate-800/60 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-indigo-500/5 relative overflow-hidden">
              <div className={`absolute top-0 right-0 w-24 h-24 ${stat.bg} rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-500`}></div>
              <div className="relative z-10 flex items-center justify-between mb-4">
                <div className={`p-3.5 rounded-xl ${stat.bg} ${stat.color} shadow-inner`}>
                  <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className="w-8 h-8 rounded-full flex items-center justify-center hover:bg-slate-800 text-slate-500 hover:text-slate-300 cursor-pointer transition-colors">
                  <MoreHorizontal size={20} />
                </div>
              </div>
              <p className="text-sm font-semibold text-slate-400 mb-1 tracking-wide uppercase">{stat.label}</p>
              <h3 className="text-4xl font-black text-white tracking-tight">{stat.value}</h3>
            </div>
          )
        })}
      </div>

      {/* Interactive Charts Section */}
      <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
        <div className="lg:col-span-2 flex flex-col rounded-3xl bg-slate-900/30 border border-slate-800/60 overflow-hidden backdrop-blur-xl shadow-xl">
          <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-indigo-500/10 rounded-xl text-indigo-400">
                <BarChart2 size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Activity Overview</h2>
            </div>
          </div>
          <div className="p-6">
            <ActivityChart data={mock.activityData} />
          </div>
        </div>

        <div className="flex flex-col rounded-3xl bg-slate-900/30 border border-slate-800/60 overflow-hidden backdrop-blur-xl shadow-xl">
          <div className="p-6 border-b border-slate-800/60 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-emerald-500/10 rounded-xl text-emerald-400">
                <PieChartIcon size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Task Status</h2>
            </div>
          </div>
          <div className="p-6 flex-1 flex flex-col items-center justify-center relative">
            <TaskStatusChart data={mock.taskStatusData} />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <div className="text-center">
                <span className="block text-3xl font-black text-white">{displayTotalTasks + displayTotalProjects}</span>
                <span className="block text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Workspace</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Data Grids */}
      <div className="grid lg:grid-cols-2 gap-6 md:gap-8 pb-10">
        
        {/* Recent Projects */}
        <div className="flex flex-col rounded-3xl bg-slate-900/30 border border-slate-800/60 overflow-hidden backdrop-blur-xl shadow-xl">
          <div className="p-6 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-blue-500/10 rounded-xl text-blue-400">
                <FolderGit2 size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Recent Projects</h2>
            </div>
            <Link href="/dashboard/projects" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors group px-3 py-1.5 rounded-lg hover:bg-indigo-500/10">
              View All <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="p-3">
            <div className="space-y-2">
              {displayProjects.slice(0, 5).map((project: any) => (
                <Link href={`/dashboard/projects/${project.id}`} key={project.id}>
                  <div className="group flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-700/50 cursor-pointer">
                    <div className="mb-3 sm:mb-0">
                      <h3 className="font-bold text-slate-200 group-hover:text-indigo-400 transition-colors">{project.name}</h3>
                      <p className="text-sm text-slate-500 truncate max-w-[280px] font-medium">{project.description || 'No description'}</p>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className={`text-xs px-3 py-1.5 rounded-lg font-bold border uppercase tracking-wider ${
                        project.status === 'in_progress' ? 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20' : 
                        project.status === 'completed' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' : 
                        'bg-slate-800 text-slate-400 border-slate-700'
                      }`}>
                        {project.status.replace('_', ' ')}
                      </span>
                      <div className="w-10 h-10 rounded-xl bg-slate-800 flex items-center justify-center text-slate-400 group-hover:bg-indigo-500 group-hover:text-white transition-all shadow-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6"/></svg>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* My Tasks */}
        <div className="flex flex-col rounded-3xl bg-slate-900/30 border border-slate-800/60 overflow-hidden backdrop-blur-xl shadow-xl">
          <div className="p-6 border-b border-slate-800/60 flex items-center justify-between bg-slate-900/20">
            <div className="flex items-center gap-3">
              <div className="p-2.5 bg-orange-500/10 rounded-xl text-orange-400">
                <CheckCircle2 size={20} strokeWidth={2.5} />
              </div>
              <h2 className="text-xl font-bold text-white tracking-tight">Priority Tasks</h2>
            </div>
            <Link href="/dashboard/tasks" className="text-sm font-bold text-indigo-400 hover:text-indigo-300 flex items-center gap-1 transition-colors group px-3 py-1.5 rounded-lg hover:bg-indigo-500/10">
              View All <ArrowUpRight size={16} strokeWidth={2.5} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>
          
          <div className="p-3">
            <div className="space-y-2">
              {displayTasks.slice(0, 5).map((task: any) => (
                <div key={task.id} className="group flex items-center gap-4 p-4 rounded-2xl hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-slate-700/50 cursor-pointer">
                  <button className="flex-shrink-0 w-6 h-6 rounded-md border-2 border-slate-600 hover:border-indigo-400 hover:bg-indigo-500/20 transition-all focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-slate-900"></button>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-slate-200 group-hover:text-white transition-colors truncate">{task.title}</h3>
                    <div className="flex items-center gap-3 mt-1.5">
                      <span className="text-xs font-semibold text-slate-500 truncate bg-slate-800 px-2 py-0.5 rounded">{task.project?.name || 'No Project'}</span>
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
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}
