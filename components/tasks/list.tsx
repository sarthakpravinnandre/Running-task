'use client'

import { CheckCircle2, Clock, AlertCircle } from 'lucide-react'

export default function TasksList({ tasks }: { tasks: any[] }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'todo':
        return 'bg-slate-800 text-slate-400 border-slate-700'
      case 'in_progress':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20'
      case 'review':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'completed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
      case 'blocked':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical':
        return 'bg-red-500/10 text-red-400 border-red-500/20'
      case 'high':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20'
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/20'
      default:
        return 'bg-slate-800 text-slate-400 border-slate-700'
    }
  }

  return (
    <div className="space-y-4">
      {tasks.map((task: any) => (
        <div
          key={task.id}
          className="group flex flex-col md:flex-row md:items-center justify-between p-6 bg-slate-900/40 border border-slate-800/60 rounded-2xl hover:bg-slate-800/50 transition-all duration-300 hover:shadow-xl hover:shadow-orange-500/5 backdrop-blur-xl relative overflow-hidden cursor-pointer"
        >
          <div className="flex items-start gap-4 mb-4 md:mb-0">
            <button className={`flex-shrink-0 w-6 h-6 rounded-md border-2 transition-all flex items-center justify-center mt-0.5 ${
              task.status === 'completed' 
                ? 'bg-emerald-500 border-emerald-500 text-white' 
                : 'border-slate-600 group-hover:border-orange-400 group-hover:bg-orange-500/10'
            }`}>
              {task.status === 'completed' && <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>}
            </button>
            
            <div className="flex-1 min-w-0">
              <h3 className={`font-bold text-lg mb-1 transition-colors ${task.status === 'completed' ? 'text-slate-500 line-through' : 'text-slate-200 group-hover:text-white'}`}>
                {task.title}
              </h3>
              {task.description && (
                <p className="text-sm font-medium text-slate-500 mb-2 max-w-2xl">
                  {task.description}
                </p>
              )}
              <div className="flex items-center gap-3">
                {task.project?.name && (
                  <span className="text-xs font-semibold text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                    {task.project.name}
                  </span>
                )}
                {task.due_date && (
                  <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                    <Clock size={12} />
                    {new Date(task.due_date).toLocaleDateString()}
                  </span>
                )}
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-3 md:pl-6 ml-10 md:ml-0 md:border-l border-slate-800/60 self-start md:self-auto">
            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${getPriorityColor(task.priority)} flex items-center gap-1.5`}>
              {task.priority === 'critical' && <AlertCircle size={10} />}
              {task.priority}
            </span>
            <span className={`px-2.5 py-1 text-[10px] font-black uppercase tracking-wider rounded-md border ${getStatusColor(task.status)}`}>
              {task.status.replace('_', ' ')}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
