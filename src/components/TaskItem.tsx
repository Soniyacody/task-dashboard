import React, { useState, useRef, useEffect } from 'react';
import Button from './common/Button';
import type { Task, Priority, Status } from '../types/task';
import { formatDate, isOverdue, getAvailableDates, getDateLabel } from '../utils/dateUtils';
import '../styles.css';

interface TaskItemProps {
    task: Task;
    onEdit: (id: string, updates: Partial<Task>) => void;
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: Status) => void;
}

const TaskItem: React.FC<TaskItemProps> = ({
    task,
    onEdit,
    onDelete,
    onStatusChange,
}) => {
    const [isEditMode, setIsEditMode] = useState(false);
    const [editTitle, setEditTitle] = useState(task.title);
    const [editPriority, setEditPriority] = useState<Priority>(task.priority);
    const [editDueDate, setEditDueDate] = useState(task.dueDate);
    const [showSuccess, setShowSuccess] = useState(false);
    const titleInputRef = useRef<HTMLInputElement>(null);

    const overdue = isOverdue(task.dueDate) && task.status !== 'Done';
    const availableDates = getAvailableDates();

    useEffect(() => {
        if (isEditMode && titleInputRef.current) {
            titleInputRef.current.focus();
            titleInputRef.current.select();
        }
    }, [isEditMode]);

    const getPriorityBadgeClass = (priority: Priority) => {
        return `badge badge-${priority.toLowerCase()}`;
    };

    const getStatusBadgeClass = (status: Status) => {
        return `badge badge-${status.toLowerCase().replace(' ', '-')}`;
    };

    const handleStatusClick = () => {
        const statusOrder: Status[] = ['Todo', 'In Progress', 'Done'];
        const currentIndex = statusOrder.indexOf(task.status);
        const nextIndex = (currentIndex + 1) % statusOrder.length;
        onStatusChange(task.id, statusOrder[nextIndex]);
    };

    const handleEditClick = () => {
        setIsEditMode(true);
        setEditTitle(task.title);
        setEditPriority(task.priority);
        setEditDueDate(task.dueDate);
    };

    const handleSaveEdit = () => {
        if (!editTitle.trim()) {
            alert('Task title cannot be empty!');
            return;
        }

        onEdit(task.id, {
            title: editTitle.trim(),
            priority: editPriority,
            dueDate: editDueDate
        });

        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 2000);
        setIsEditMode(false);
    };

    const handleCancelEdit = () => {
        setIsEditMode(false);
        setEditTitle(task.title);
        setEditPriority(task.priority);
        setEditDueDate(task.dueDate);
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSaveEdit();
        } else if (e.key === 'Escape') {
            handleCancelEdit();
        }
    };

    const priorityOptions = [
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
    ];

    if (isEditMode) {
        return (
            <li className={`list-item edit-mode ${overdue ? 'overdue' : ''} ${task.status === 'Done' ? 'completed' : ''}`}>
                {/* Edit Mode */}
                <div className="edit-form-row">
                    <div className="edit-form-field" style={{ flex: 2 }}>
                        <input
                            ref={titleInputRef}
                            type="text"
                            value={editTitle}
                            onChange={(e) => setEditTitle(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className="edit-input"
                            placeholder="Task title"
                        />
                    </div>

                    <div className="edit-form-field" style={{ flex: 1 }}>
                        <select
                            value={editPriority}
                            onChange={(e) => setEditPriority(e.target.value as Priority)}
                            className="select"
                            style={{ height: '40px' }}
                        >
                            {priorityOptions.map(option => (
                                <option key={option.value} value={option.value}>
                                    {option.label}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="edit-form-field" style={{ flex: 1 }}>
                        <select
                            value={editDueDate}
                            onChange={(e) => setEditDueDate(e.target.value)}
                            className="select"
                            style={{ height: '40px' }}
                        >
                            {availableDates.map(date => (
                                <option key={date} value={date}>
                                    {date} ({getDateLabel(date)})
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                <div className="edit-actions">
                    <Button
                        variant="success"
                        size="sm"
                        onClick={handleSaveEdit}
                    >
                        💾 Save
                    </Button>
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleCancelEdit}
                    >
                        ✗ Cancel
                    </Button>
                </div>

                {/* Success Message */}
                {showSuccess && (
                    <div className="success-message">
                        ✅ Task updated successfully!
                    </div>
                )}
            </li>
        );
    }

    // View Mode
    return (
        <li className={`list-item ${overdue ? 'overdue' : ''} ${task.status === 'Done' ? 'completed' : ''}`}>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="task-content">
                    <div className="flex items-center gap-2 mb-2 flex-wrap">
                        <h4 className="text-lg font-semibold">{task.title}</h4>
                        <span className={getPriorityBadgeClass(task.priority)}>
                            {task.priority}
                        </span>
                        <button
                            onClick={handleStatusClick}
                            className={getStatusBadgeClass(task.status)}
                            style={{ cursor: 'pointer', border: 'none', font: 'inherit' }}
                        >
                            {task.status}
                        </button>
                    </div>

                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1">
                            <span>📅</span>
                            <span className={`text-sm ${overdue ? 'font-semibold' : ''}`}
                                style={{ color: overdue ? 'var(--danger)' : 'var(--text-secondary)' }}>
                                Due: {formatDate(task.dueDate)}
                                {overdue && ' ⚠️ Overdue'}
                            </span>
                        </div>

                        <span className="text-sm" style={{ color: 'var(--text-muted)' }}>
                            Created: {formatDate(task.createdAt)}
                        </span>
                    </div>
                </div>

                <div className="task-actions">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={handleEditClick}
                    >
                        ✎ Edit
                    </Button>

                    <Button
                        variant="danger"
                        size="sm"
                        onClick={() => {
                            if (task.status === 'Done') {
                                alert('Cannot delete completed tasks!');
                                return;
                            }
                            if (window.confirm('Are you sure you want to delete this task?')) {
                                onDelete(task.id);
                            }
                        }}
                    >
                        🗑 Delete
                    </Button>
                </div>
            </div>
        </li>
    );
};

export default TaskItem;