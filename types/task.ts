export interface User {
  id: string;
  name: string;
  avatar: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: 'To Do' | 'In Progress' | 'Approved' | 'Reject';
  category: 'Research' | 'Design' | 'Feedback' | 'Other' | 'Presentation' | 'Interface' | 'UX Research';
  priority: 'Low' | 'Medium' | 'High';
  assignees: User[];
  dueDate?: string;
  attachments?: number;
  comments?: number;
  reports?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Column {
  id: string;
  title: string;
  status: 'To Do' | 'In Progress' | 'Approved' | 'Reject';
  color: string;
  tasks: Task[];
}