import React from 'react';
import TaskItem from './TaskItem';
import type { Task, Status } from '../types/task';

interface TaskListProps {
    tasks: Task[];
    editingTaskId: string | null;
    onEditTask: (task: Task) => void;
    onDeleteTask: (id: string) => void;
    onStatusChange: (id: string, status: Status) => void;
}

const TaskList: React.FC<TaskListProps> = ({
    tasks,
    editingTaskId,
    onEditTask,
    onDeleteTask,
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
            <ul>
                {tasks.map((task) => (
                    <TaskItem
                        key={task.id}
                        task={task}
                        onEdit={onEditTask}
                        onDelete={onDeleteTask}
                        onStatusChange={onStatusChange}
                        isEditing={editingTaskId === task.id}
                    />
                ))}
            </ul>
        </div>
    );
};

export default TaskList;