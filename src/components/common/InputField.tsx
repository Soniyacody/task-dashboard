import React from 'react';
import '../../../src/styles.css';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

const InputField: React.FC<InputFieldProps> = ({
    label,
    error,
    className = '',
    ...props
}) => {
    return (
        <div className="w-full">
            {label && <label className="block mb-1 text-sm font-semibold">{label}</label>}
            <input
                className={`input ${className}`}
                {...props}
            />
            {error && <div className="mt-1 text-sm" style={{ color: 'var(--danger)' }}>{error}</div>}
        </div>
    );
};

export default InputField;