import React, { useEffect } from 'react';
import '../../styles.css';

export type ToastType = 'success' | 'info' | 'warning' | 'error';

interface ToastProps {
    id: string;
    type: ToastType;
    title: string;
    message: string;
    onClose: (id: string) => void;
    duration?: number;
}

const Toast: React.FC<ToastProps> = ({
    id,
    type,
    title,
    message,
    onClose,
    duration = 3000
}) => {
    useEffect(() => {
        const timer = setTimeout(() => {
            onClose(id);
        }, duration);

        return () => clearTimeout(timer);
    }, [id, duration, onClose]);

    const icons = {
        success: '✅',
        info: 'ℹ️',
        warning: '⚠️',
        error: '❌'
    };

    return (
        <div className={`toast toast-${type}`}>
            <div className="toast-icon">{icons[type]}</div>
            <div className="toast-content">
                <div className="toast-title">{title}</div>
                <div className="toast-message">{message}</div>
            </div>
        </div>
    );
};

export default Toast;