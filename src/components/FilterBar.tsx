import React from 'react';
import SelectField from './common/SelectField';
import type { FilterState } from '../types/task';
import '../styles.css';

interface FilterBarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
    taskCount: number;
}

const FilterBar: React.FC<FilterBarProps> = ({
    filters,
    onFilterChange,
    taskCount
}) => {
    const statusOptions = [
        { value: 'All', label: 'All Status' },
        { value: 'Todo', label: 'Todo' },
        { value: 'In Progress', label: 'In Progress' },
        { value: 'Done', label: 'Done' }
    ];

    const priorityOptions = [
        { value: 'All', label: 'All Priorities' },
        { value: 'Low', label: 'Low' },
        { value: 'Medium', label: 'Medium' },
        { value: 'High', label: 'High' }
    ];

    const sortOptions = [
        { value: 'dueDate', label: 'Due Date' },
        { value: 'priority', label: 'Priority' },
        { value: 'createdAt', label: 'Created Date' }
    ];

    const orderOptions = [
        { value: 'asc', label: 'Ascending' },
        { value: 'desc', label: 'Descending' }
    ];

    const handleChange = (key: keyof FilterState, value: string) => {
        onFilterChange({
            ...filters,
            [key]: value
        });
    };

    return (
        <div className="card mb-4">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 mb-3">
                <div>
                    <h3 className="font-bold">Tasks ({taskCount})</h3>
                    <p className="text-sm" style={{ color: 'var(--text-secondary)' }}>
                        Filter and sort your tasks
                    </p>
                </div>

                <div className="flex flex-wrap gap-3 filter-row" style={{ width: '100%', maxWidth: '800px' }}>
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <SelectField
                            options={statusOptions}
                            value={filters.status}
                            onChange={(e) => handleChange('status', e.target.value)}
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <SelectField
                            options={priorityOptions}
                            value={filters.priority}
                            onChange={(e) => handleChange('priority', e.target.value)}
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <SelectField
                            options={sortOptions}
                            value={filters.sortBy}
                            onChange={(e) => handleChange('sortBy', e.target.value)}
                        />
                    </div>

                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <SelectField
                            options={orderOptions}
                            value={filters.sortOrder}
                            onChange={(e) => handleChange('sortOrder', e.target.value)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default FilterBar;