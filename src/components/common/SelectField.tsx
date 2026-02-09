import React from 'react';
import '../../../src/styles.css';

interface SelectOption {
    value: string;
    label: string;
}

interface SelectFieldProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    options: SelectOption[];
    error?: string;
}

const SelectField: React.FC<SelectFieldProps> = ({
    label,
    options,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && <label className="block mb-1 text-sm font-semibold">{label}</label>}
            <select
                className={`select ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <div className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{error}</div>}
        </div>
    );
};

export default SelectField;