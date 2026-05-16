import { getCurrentUser } from '@/lib/auth'
import { getTasks } from '@/lib/db'
import TasksList from '@/components/tasks/list'
import CreateTaskDialog from '@/components/tasks/create-dialog'

export default async function TasksPage() {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return (
      <div className="flex items-center justify-center h-full">
        <svg className="animate-spin h-8 w-8 text-indigo-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
      </div>
    )
  }

  const rawTasks = await getTasks(undefined, currentUser.id)

  const { generateMockData } = await import('@/lib/mock-data')
  const isDemo = true
  const mock = generateMockData()
  const tasks = isDemo ? mock.mockTasks : rawTasks

  return (
    <div className="p-4 sm:p-6 md:p-10 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="relative overflow-hidden rounded-3xl bg-slate-900/40 border border-slate-800/60 p-8 shadow-xl backdrop-blur-xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 tracking-tight">Tasks</h1>
            <p className="text-slate-400 font-medium">
              View and manage all your tasks
            </p>
          </div>
          <div className="self-start md:self-auto relative z-20">
            <CreateTaskDialog userId={currentUser.id} />
          </div>
        </div>
      </div>

      {tasks.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 bg-slate-900/30 border border-slate-800/60 rounded-3xl backdrop-blur-xl shadow-xl text-center">
          <div className="w-16 h-16 bg-slate-800/50 rounded-full flex items-center justify-center mb-6 text-slate-500">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
          </div>
          <h3 className="text-xl font-bold text-white mb-2">No tasks yet</h3>
          <p className="text-slate-500 mb-8 max-w-md mx-auto">
            Get started by creating your first task to track your work.
          </p>
        </div>
      ) : (
        <TasksList tasks={tasks} />
      )}
    </div>
  )
}
