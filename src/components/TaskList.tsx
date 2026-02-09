import React from 'react';
import TaskItem from './TaskItem';
import type { Task, Status } from '../types/task';
import '../styles.css';

interface TaskListProps {
    tasks: Task[];
    onEdit: (id: string, updates: Partial<Task>) => void; // FIXED: This should match TaskItem's onEdit
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: Status) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    onEdit,
    onDelete,
    onStatusChange
}) => {
    if (tasks.length === 0) {
        return (
            <div className="card p-8 text-center">
                <div className="text-5xl mb-4">📝</div>
                <h3 className="text-xl font-bold mb-2">No tasks yet!</h3>
                <p className="text-gray-600">Add your first task to get started.</p>
            </div>
        );
    }

    return (
        <div className="card p-4">
            <ul className="task-list">
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={onEdit}  // This now matches the correct type
                        onDelete={onDelete}
                        onStatusChange={onStatusChange}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;