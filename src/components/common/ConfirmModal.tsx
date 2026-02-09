import React from 'react';
import Button from './Button';
import '../../styles.css';

interface ConfirmModalProps {
    isOpen: boolean;
    title: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
    onConfirm: () => void;
    onCancel: () => void;
}

const ConfirmModal: React.FC<ConfirmModalProps> = ({
    isOpen,
    title,
    message,
    confirmText = 'Confirm',
    cancelText = 'Cancel',
    onConfirm,
    onCancel
}) => {
    if (!isOpen) return null;

    return (
        <div className="confirm-modal-overlay">
            <div className="confirm-modal">
                <div className="confirm-modal-title">{title}</div>
                <div className="confirm-modal-message">{message}</div>
                <div className="confirm-modal-actions">
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

export default ConfirmModal;