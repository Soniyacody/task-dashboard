import React, { useState, useEffect } from 'react';
import TaskForm from './components/TaskForm';
import FilterBar from './components/FilterBar';
import Analytics from './components/Analytics';
import TaskItem from './components/TaskItem';
import InstructionsPanel from './components/InstructionsPanel';
import ToastContainer from './components/common/ToastContainer';
import type { ToastMessage } from './components/common/ToastContainer';
import ConfirmModal from './components/common/ConfirmModal';
import type { Task, Priority, Status, FilterState } from './types/task';
import { loadTasks, saveTasks } from './utils/localStorage';
import './styles.css';

const App: React.FC = () => {
  // State
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    status: 'All',
    priority: 'All',
    sortBy: 'dueDate',
    sortOrder: 'asc'
  });

  // Toast notifications
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Confirmation modal
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState<string | null>(null);

  // Load from localStorage on mount
  useEffect(() => {
    const savedTasks = loadTasks();
    if (savedTasks.length > 0) {
      setTasks(savedTasks);
    }
  }, []);

  // Save to localStorage whenever tasks change
  useEffect(() => {
    saveTasks(tasks);
  }, [tasks]);

  // Toast helpers
  const addToast = (type: ToastMessage['type'], title: string, message: string) => {
    const id = Date.now().toString();
    setToasts(prev => [...prev, { id, type, title, message }]);
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  // Task CRUD operations
  const addTask = (taskData: { title: string; priority: Priority; status: Status; dueDate: string }) => {
    const newTask: Task = {
      id: Date.now().toString(),
      title: taskData.title.trim(),
      priority: taskData.priority,
      status: taskData.status,
      dueDate: taskData.dueDate,
      createdAt: new Date().toISOString()
    };

    setTasks(prev => [...prev, newTask]);

    // Show success toast
    addToast('success', 'Task Added', `"${taskData.title}" has been added successfully.`);
  };

  const handleTaskAdded = () => {
    // This is called from TaskForm after successful addition
    // Input fields are cleared in TaskForm component
  };

  const updateTask = (id: string, updates: Partial<Task>) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, ...updates } : t
    ));

    // Show success toast
    addToast('success', 'Task Updated', `"${updates.title || task.title}" has been updated successfully.`);
  };

  const requestDeleteTask = (id: string) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    if (task.status === 'Done') {
      addToast('error', 'Cannot Delete', 'Completed tasks cannot be deleted.');
      return;
    }

    setTaskToDelete(id);
    setShowConfirmModal(true);
  };

  const confirmDeleteTask = () => {
    if (!taskToDelete) return;

    const task = tasks.find(t => t.id === taskToDelete);
    if (task) {
      setTasks(prev => prev.filter(t => t.id !== taskToDelete));
      addToast('info', 'Task Deleted', `"${task.title}" has been removed.`);
    }

    setTaskToDelete(null);
    setShowConfirmModal(false);
  };

  const cancelDeleteTask = () => {
    setTaskToDelete(null);
    setShowConfirmModal(false);
  };

  const updateTaskStatus = (id: string, status: Status) => {
    const task = tasks.find(t => t.id === id);
    if (!task) return;

    setTasks(prev => prev.map(t =>
      t.id === id ? { ...t, status } : t
    ));

    // Show status change toast
    addToast('info', 'Status Updated', `Task "${task.title}" is now ${status}.`);
  };

  // Filter and sort tasks (show all by default)
  const filteredAndSortedTasks = tasks
    .filter(task => {
      if (filters.status !== 'All' && task.status !== filters.status) return false;
      if (filters.priority !== 'All' && task.priority !== filters.priority) return false;
      return true;
    })
    .sort((a, b) => {
      let comparison = 0;

      switch (filters.sortBy) {
        case 'dueDate':
          comparison = new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
          break;
        case 'priority':
          const priorityOrder: Record<Priority, number> = { High: 1, Medium: 2, Low: 3 };
          comparison = priorityOrder[a.priority] - priorityOrder[b.priority];
          break;
        case 'createdAt':
          comparison = new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
          break;
      }

      return filters.sortOrder === 'asc' ? comparison : -comparison;
    });

  return (
    <div className="container">
      {/* Toast Notifications */}
      <ToastContainer toasts={toasts} onClose={removeToast} />

      {/* Confirmation Modal */}
      <ConfirmModal
        isOpen={showConfirmModal}
        title="Delete Task"
        message="Are you sure you want to delete this task? This action cannot be undone."
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={confirmDeleteTask}
        onCancel={cancelDeleteTask}
      />

      {/* Header */}
      <header className="text-center mb-6">
        <h1 className="text-3xl font-bold mb-2">📋 Task Dashboard</h1>
        <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
          Manage your tasks efficiently and stay productive
        </p>
      </header>

      {/* Instructions Panel */}
      <InstructionsPanel />

      {/* Analytics Dashboard */}
      <Analytics tasks={tasks} />

      {/* Task Form - Only for adding new tasks */}
      <TaskForm
        onSubmit={addTask}
        onTaskAdded={handleTaskAdded}
      />

      {/* Filter Bar - Show only if there are tasks */}
      {tasks.length > 0 && (
        <FilterBar
          filters={filters}
          onFilterChange={setFilters}
          taskCount={filteredAndSortedTasks.length}
        />
      )}


      {/* Task List */}
      {filteredAndSortedTasks.length > 0 ? (
        <div className="card p-4">
          <ul className="task-list"> {/* Add class here */}
            {filteredAndSortedTasks.map((task) => (
              <TaskItem
                key={task.id}
                task={task}
                onEdit={updateTask}
                onDelete={requestDeleteTask}
                onStatusChange={updateTaskStatus}
              />
            ))}
          </ul>
        </div>
      ) : (
        <div className="card p-8 text-center">
          <div className="text-5xl mb-4">📝</div>
          <h3 className="text-xl font-bold mb-2">
            {tasks.length === 0 ? 'No tasks yet!' : 'No tasks match your filters'}
          </h3>
          <p className="text-gray-600">
            {tasks.length === 0
              ? 'Add your first task to get started.'
              : 'Try changing your filter settings.'}
          </p>
        </div>
      )}
    </div>
  );
};

export default App;