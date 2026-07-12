'use client';

export default function Toast({ show, message, isError }) {
    return (
        <div
            className={`fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white px-6 py-3 rounded-full shadow-glow-gold border border-gold/30 font-medium text-sm flex items-center gap-3 z-50 transition-all duration-500 whitespace-nowrap ${
                show ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
            } ${isError ? 'text-red-600' : 'text-burgundy'}`}
        >
            <i className={`text-lg ${isError ? 'fa-solid fa-circle-exclamation text-red-500' : 'fa-solid fa-check-circle text-green-500'}`}></i>
            <span>{message}</span>
        </div>
    );
}
