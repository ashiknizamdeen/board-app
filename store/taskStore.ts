import { create } from 'zustand';

interface Task {
  id: string;
  title: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'todo' | 'in_progress' | 'approved' | 'rejected';
  assignees: string[];
  comments: number;
  attachments: number;
  dueDate?: string;
  hasImage?: boolean;
  reports?: number;
}

interface TaskState {
  tasks: Task[];
  searchQuery: string;
  filteredTasks: Task[];
  setTasks: (tasks: Task[]) => void;
  setSearchQuery: (query: string) => void;
  moveTask: (taskId: string, newStatus: 'todo' | 'in_progress' | 'approved' | 'rejected') => void;
  loadTasks: () => Promise<void>;
  saveTasks: () => void;
  filterTasks: () => void;
}

const useTaskStore = create<TaskState>((set, get) => ({
  tasks: [],
  searchQuery: '',
  filteredTasks: [],

  setTasks: (tasks) => {
    set({ tasks });
    get().filterTasks();
    get().saveTasks();
  },

  setSearchQuery: (query) => {
    set({ searchQuery: query });
    get().filterTasks();
  },

  moveTask: (taskId, newStatus) => {
    const { tasks } = get();
    const updatedTasks = tasks.map(task =>
      task.id === taskId ? { ...task, status: newStatus } : task
    );
    set({ tasks: updatedTasks });
    get().filterTasks();
    get().saveTasks();
  },

  loadTasks: async () => {
    try {
      // First try to load from localStorage
      const savedTasks = localStorage.getItem('boardTasks');
      if (savedTasks) {
        const parsedTasks = JSON.parse(savedTasks);
        set({ tasks: parsedTasks });
        get().filterTasks();
        return;
      }

      // If no saved tasks, load from mock data
      const mockTasks: Task[] = [
        {
          id: '1',
          title: 'User interview',
          category: 'Research',
          priority: 'low',
          status: 'todo',
          assignees: ['John', 'Sarah'],
          comments: 2,
          attachments: 2,
          dueDate: 'Tomorrow'
        },
        {
          id: '2',
          title: 'Design System',
          category: 'Design',
          priority: 'medium',
          status: 'todo',
          assignees: ['Mike', 'Lisa'],
          comments: 8,
          attachments: 3,
          reports: 2
        },
        {
          id: '3',
          title: 'Speech',
          category: 'Other',
          priority: 'low',
          status: 'todo',
          assignees: ['Alex', 'Tom'],
          comments: 3,
          attachments: 1
        },
        {
          id: '4',
          title: 'Wireframe',
          category: 'Design',
          priority: 'high',
          status: 'todo',
          assignees: ['Emma', 'David'],
          comments: 0,
          attachments: 0,
          hasImage: true
        },
        {
          id: '5',
          title: 'UI Design',
          category: 'Design',
          priority: 'high',
          status: 'in_progress',
          assignees: ['Sarah', 'Mike'],
          comments: 2,
          attachments: 2,
          dueDate: 'Tomorrow'
        },
        {
          id: '6',
          title: 'Check Clients Feedback',
          category: 'Feedback',
          priority: 'low',
          status: 'in_progress',
          assignees: ['John', 'Lisa', 'Alex'],
          comments: 8,
          attachments: 0,
          dueDate: '22 April, 2022',
          hasImage: true
        },
        {
          id: '7',
          title: 'Copyright',
          category: 'Presentation',
          priority: 'low',
          status: 'in_progress',
          assignees: ['Tom'],
          comments: 4,
          attachments: 0,
          dueDate: '22 April, 2022'
        },
        {
          id: '8',
          title: 'Filter sorting',
          category: 'UX Research',
          priority: 'medium',
          status: 'in_progress',
          assignees: ['Emma', 'David'],
          comments: 0,
          attachments: 0
        },
        {
          id: '9',
          title: 'Prototype',
          category: 'Research',
          priority: 'low',
          status: 'approved',
          assignees: ['Sarah', 'Mike', 'John'],
          comments: 243,
          attachments: 35
        },
        {
          id: '10',
          title: 'Detail Page',
          category: 'Design',
          priority: 'high',
          status: 'approved',
          assignees: ['Lisa', 'Alex'],
          comments: 28,
          attachments: 6,
          hasImage: true
        },
        {
          id: '11',
          title: 'Animation preloaders',
          category: 'Interface',
          priority: 'high',
          status: 'approved',
          assignees: ['Tom'],
          comments: 9,
          attachments: 4
        },
        {
          id: '12',
          title: 'Sorting category',
          category: 'UX Research',
          priority: 'medium',
          status: 'approved',
          assignees: ['Emma', 'David'],
          comments: 0,
          attachments: 4
        },
        {
          id: '13',
          title: 'Group Management',
          category: 'Other',
          priority: 'low',
          status: 'rejected',
          assignees: ['Sarah'],
          comments: 329,
          attachments: 0
        },
        {
          id: '14',
          title: 'Design System',
          category: 'Design',
          priority: 'low',
          status: 'rejected',
          assignees: ['Mike'],
          comments: 8,
          attachments: 3,
          reports: 2
        },
        {
          id: '15',
          title: 'Slider controls',
          category: 'Interface',
          priority: 'low',
          status: 'rejected',
          assignees: ['Lisa', 'Alex'],
          comments: 31,
          attachments: 8
        },
        {
          id: '16',
          title: 'Slider controls',
          category: 'Design',
          priority: 'low',
          status: 'rejected',
          assignees: ['Tom', 'Emma'],
          comments: 0,
          attachments: 8,
          hasImage: true
        }
      ];

      set({ tasks: mockTasks });
      get().filterTasks();
      get().saveTasks();
    } catch (error) {
      console.error('Error loading tasks:', error);
    }
  },

  saveTasks: () => {
    const { tasks } = get();
    localStorage.setItem('boardTasks', JSON.stringify(tasks));
  },

  filterTasks: () => {
    const { tasks, searchQuery } = get();
    if (!searchQuery.trim()) {
      set({ filteredTasks: tasks });
      return;
    }
    
    const filtered = tasks.filter(task =>
      task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
    );
    set({ filteredTasks: filtered });
  }
}));

export default useTaskStore;