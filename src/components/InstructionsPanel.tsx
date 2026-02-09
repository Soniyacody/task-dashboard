import React, { useState } from 'react';
import '../styles.css';

const InstructionsPanel: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="instructions-panel">
            <div
                className="instructions-header"
                onClick={() => setIsOpen(!isOpen)}
            >
                <div className="flex items-center gap-2">
                    <span>ℹ️</span>
                    <span className="font-semibold">Quick Guide</span>
                </div>
                <span className={`toggle-icon ${isOpen ? 'rotated' : ''}`}>
                    ▼
                </span>
            </div>

            {isOpen && (
                <div className="instructions-content">
                    <div className="space-y-1">
                        <div className="text-sm">• Click status badge to change task status</div>
                        <div className="text-sm">• Edit button modifies task details</div>
                        <div className="text-sm">• Delete removes task (completed tasks protected)</div>
                        <div className="text-sm">• Due dates limited to next 5 days only</div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default InstructionsPanel;