'use client';

import { useState, useEffect, useRef } from 'react';

export default function CustomizeModal({ isOpen, onClose, coupleNames, onSave }) {
    const [inputValue, setInputValue] = useState(coupleNames);
    const modalRef = useRef(null);
    const contentRef = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (isOpen) {
            setInputValue(coupleNames);
            // Small delay for animation
            setTimeout(() => setVisible(true), 10);
        } else {
            setVisible(false);
        }
    }, [isOpen, coupleNames]);

    const handleClose = () => {
        setVisible(false);
        setTimeout(() => onClose(), 300);
    };

    const handleBackdropClick = (e) => {
        if (e.target === modalRef.current) {
            handleClose();
        }
    };

    const handleSave = () => {
        const trimmed = inputValue.trim();
        if (trimmed) {
            onSave(trimmed);
        }
    };

    if (!isOpen) return null;

    return (
        <div
            ref={modalRef}
            onClick={handleBackdropClick}
            className={`fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center px-4 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}
        >
            <div
                ref={contentRef}
                className={`bg-card rounded-xl p-6 sm:p-8 max-w-md w-full shadow-2xl card-ornament border border-gold/20 relative transition-transform duration-300 ${visible ? 'scale-100' : 'scale-95'}`}
            >
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-playfair text-2xl text-burgundy">Customize Lamaanaha</h3>
                    <button onClick={handleClose} className="text-gray-400 hover:text-burgundy transition-colors">
                        <i className="fa-solid fa-times text-xl"></i>
                    </button>
                </div>

                <div className="mb-6">
                    <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">Couple Names</label>
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        placeholder="e.g. Muna & Axmed"
                        className="w-full bg-ivory/50 border border-gold/30 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors"
                    />
                </div>

                <button
                    onClick={handleSave}
                    className="w-full bg-burgundy hover:bg-burgundy-light text-white font-medium py-3 rounded-md transition-all shadow-md hover:shadow-glow-gold"
                >
                    Save Changes
                </button>
            </div>
        </div>
    );
}
