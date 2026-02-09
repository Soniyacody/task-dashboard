import React, { useState } from 'react';
import InputField from './common/InputField';
import SelectField from './common/SelectField';
import Button from './common/Button';
import type { Priority, Status } from '../types/task';
import { getAvailableDates, getDateLabel } from '../utils/dateUtils';
import '../styles.css';

interface TaskFormProps {
    onSubmit: (task: {
        title: string;
        priority: Priority;
        status: Status;
        dueDate: string;
    }) => void;
    initialData?: {
        title: string;
        priority: Priority;
        status: Status;
        dueDate: string;
    };
    isEditing?: boolean;
    onCancel?: () => void;
    onTaskAdded?: () => void; // New prop to notify parent
}

const TaskForm: React.FC<TaskFormProps> = ({
    onSubmit,
    initialData,
    isEditing = false,
    onCancel,
    onTaskAdded
}) => {
    const [title, setTitle] = useState(initialData?.title || '');
    const [priority, setPriority] = useState<Priority>(initialData?.priority || 'Medium');
    const [status, setStatus] = useState<Status>(initialData?.status || 'Todo');
    const [dueDate, setDueDate] = useState(initialData?.dueDate || getAvailableDates()[0]);
    const [error, setError] = useState('');

    const availableDates = getAvailableDates();

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
    ];

    const statusOptions = [
        { value: 'Todo', label: 'Todo' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Done', label: 'Done' }
    ];

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title.trim()) {
            setError('Task title is required');
            return;
        }

        if (!dueDate) {
            setError('Due date is required');
            return;
        }

        onSubmit({ title, priority, status, dueDate });

        // Clear form only when adding new task (not editing)
        if (!isEditing) {
            setTitle('');
            setPriority('Medium');
            setStatus('Todo');
            setDueDate(getAvailableDates()[0]);
            setError('');

            // Notify parent that task was added
            if (onTaskAdded) {
                onTaskAdded();
            }
        } else {
            setError('');
        }
    };

    return (
        <form onSubmit={handleSubmit} className="card mb-4">
            <h3 className="text-lg font-bold mb-3">
                {isEditing ? 'Edit Task' : 'Add New Task'}
            </h3>

            {error && (
                <div className="mb-3 p-2 rounded" style={{ backgroundColor: '#fee2e2', color: 'var(--danger)' }}>
                    {error}
                </div>
            )}

            <div className="flex flex-wrap gap-3 mb-3">
                <div style={{ flex: 2, minWidth: '200px' }}>
                    <InputField
                        placeholder="What needs to be done?"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '120px' }}>
                    <SelectField
                        options={priorityOptions}
                        value={priority}
                        onChange={(e) => setPriority(e.target.value as Priority)}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '120px' }}>
                    <SelectField
                        options={statusOptions}
                        value={status}
                        onChange={(e) => setStatus(e.target.value as Status)}
                    />
                </div>

                <div style={{ flex: 1, minWidth: '140px' }}>
                    <select
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                        className="select"
                    >
                        <option value="">Select due date</option>
                        {availableDates.map(date => (
                            <option key={date} value={date}>
                                {date} ({getDateLabel(date)})
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="flex gap-2">
                <Button type="submit" variant="primary">
                    {isEditing ? 'Save Changes' : 'Add Task'}
                </Button>
                {isEditing && onCancel && (
                    <Button type="button" variant="outline" onClick={onCancel}>
                        Cancel
                    </Button>
                )}
            </div>

            <div className="mt-3 text-sm" style={{ color: 'var(--text-secondary)' }}>
                <p>📅 Due dates are limited to today and the next 4 days only.</p>
            </div>
        </form>
    );
};

export default TaskForm;