// Helper to generate consistent random numbers
const seedRandom = (seed: number) => {
  const x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Generate randomized but realistic looking data
export const generateMockData = () => {
  const baseSeed = 42; // Fixed seed so it doesn't flicker on every render, but looks random
  
  const totalProjects = 22;
  const activeProjects = 8;
  
  const totalTasks = 57;
  const completedTasks = 37;
  const pendingTasks = 20;

  const projectNames = ['Website Redesign', 'Mobile App Beta', 'Database Migration', 'Marketing Campaign', 'Security Audit', 'API Integration', 'Cloud Migration', 'User Research', 'Brand Refresh'];
  const projectDescriptions = ['Overhaul of main systems', 'iOS and Android release', 'Migrate legacy data', 'Q3 Product launch', 'Annual comprehensive review'];
  
  const mockProjects = Array.from({ length: totalProjects }).map((_, i) => ({
    id: `demo-proj-${i+1}`,
    name: projectNames[i % projectNames.length] + (i > 8 ? ` ${i}` : ''),
    description: projectDescriptions[i % projectDescriptions.length],
    status: i < activeProjects ? 'in_progress' : 'completed',
    createdAt: new Date(Date.now() - Math.floor(seedRandom(baseSeed + i) * 30) * 24 * 60 * 60 * 1000),
    endDate: new Date(Date.now() + Math.floor(seedRandom(baseSeed + i + 1) * 60) * 24 * 60 * 60 * 1000),
    teamMembers: Array.from({ length: Math.floor(seedRandom(baseSeed + i) * 5) + 1 }).map((_, j) => ({ userId: `user-${j}` }))
  }));

  const taskTitles = ['Design landing page mockup', 'Fix authentication bug', 'Write migration script', 'Review Q3 copy', 'Patch OpenSSL vulnerability', 'Update user schema', 'Create animated components'];
  const mockTasks = Array.from({ length: totalTasks }).map((_, i) => {
    const pRand = seedRandom(baseSeed + 100 + i);
    return {
      id: `demo-task-${i+1}`,
      title: taskTitles[i % taskTitles.length] + (i > 6 ? ` ${i}` : ''),
      project: mockProjects[i % mockProjects.length],
      priority: pRand > 0.8 ? 'critical' : (pRand > 0.4 ? 'high' : 'medium'),
      status: i < completedTasks ? 'completed' : 'in_progress',
      createdAt: new Date(Date.now() - Math.floor(seedRandom(baseSeed + i) * 30) * 24 * 60 * 60 * 1000)
    }
  });

  // Scale activity data so it's consistent with total tasks (57)
  const activityData = [
    { name: 'Mon', tasks: 4 },
    { name: 'Tue', tasks: 7 },
    { name: 'Wed', tasks: 8 },
    { name: 'Thu', tasks: 12 },
    { name: 'Fri', tasks: 15 },
    { name: 'Sat', tasks: 5 },
    { name: 'Sun', tasks: 6 },
  ];

  // User specifically requested these 4 numbers in the status chart
  const taskStatusData = [
    { name: 'Total Projects', value: totalProjects },
    { name: 'Active Projects', value: activeProjects },
    { name: 'Pending Tasks', value: pendingTasks },
    { name: 'Completed Tasks', value: completedTasks },
  ];

  return { totalProjects, activeProjects, activeTasks: pendingTasks, completedTasks, mockProjects, mockTasks, activityData, taskStatusData, totalTasks };
}
