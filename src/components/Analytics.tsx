import React from 'react';
import type { Task } from '../types/task';
import { getAnalytics } from '../utils/analytics';
import '../styles.css';

interface AnalyticsProps {
    tasks: Task[];
}

const Analytics: React.FC<AnalyticsProps> = ({ tasks }) => {
    const analytics = getAnalytics(tasks);

    const stats = [
        { title: 'Total Tasks', value: analytics.total, icon: '📊', color: 'var(--primary)' },
        { title: 'Completed', value: analytics.completed, icon: '✅', color: 'var(--success)' },
        { title: 'Overdue', value: analytics.overdue, icon: '⚠️', color: 'var(--danger)' },
        { title: 'Completion Rate', value: `${analytics.completionRate}%`, icon: '📈', color: 'var(--warning)' },
        { title: 'In Progress', value: analytics.inProgressCount, icon: '🔄', color: 'var(--status-in-progress)' },
        { title: 'Todo', value: analytics.todoCount, icon: '📝', color: 'var(--status-todo)' },
    ];

    return (
        <div className="mb-6">
            <h3 className="text-lg font-bold mb-3">Dashboard Analytics</h3>
            <div className="analytics-grid">
                {stats.map((stat, index) => (
                    <div key={index} className="analytics-card">
                        <div className="analytics-icon">{stat.icon}</div>
                        <div className="text-sm" style={{ color: 'var(--text-secondary)' }}>{stat.title}</div>
                        <div className="text-2xl font-bold mt-1" style={{ color: stat.color }}>
                            {stat.value}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Analytics;