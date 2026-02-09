import React from 'react';
import Button from './Button';
import '../../styles.css';

interface AlertModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    onConfirm: () => void;
    onCancel: () => void;
    confirmText?: string;
    cancelText?: string;
}

const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    title,
    message,
    onConfirm,
    onCancel,
    confirmText = 'Confirm',
    cancelText = 'Cancel'
}) => {
    if (!isOpen) return null;

    return (
        <div className="alert-modal">
            <div className="alert-content">
                <h3 className="text-lg font-bold mb-2">{title}</h3>
                <p className="text-gray-600">{message}</p>
                <div className="alert-actions">
                    <Button
                        variant="outline"
                        onClick={onCancel}
                    >
                        {cancelText}
                    </Button>
                    <Button
                        variant="danger"
                        onClick={onConfirm}
                    >
                        {confirmText}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AlertModal;