import React from 'react';
import Toast from './Toast';
import type { ToastType } from './Toast';

import '../../styles.css';

export interface ToastMessage {
    id: string;
    type: ToastType;
    title: string;
    message: string;
}

interface ToastContainerProps {
    toasts: ToastMessage[];
    onClose: (id: string) => void;
}

const ToastContainer: React.FC<ToastContainerProps> = ({ toasts, onClose }) => {
    if (toasts.length === 0) return null;

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <Toast
                    key={toast.id}
                    id={toast.id}
                    type={toast.type}
                    title={toast.title}
                    message={toast.message}
                    onClose={onClose}
                />
            ))}
        </div>
    );
};

export default ToastContainer;