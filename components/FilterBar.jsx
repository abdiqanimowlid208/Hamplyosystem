'use client';

export default function FilterBar({ relationships, currentFilter, onFilterChange, messageCount }) {
    const filters = ['All', ...relationships];

    return (
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-8 bg-card/80 backdrop-blur-sm p-4 rounded-xl border border-gold/10 shadow-sm">
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto w-full sm:w-auto pb-2 sm:pb-0 hide-scrollbar">
                {filters.map(filter => (
                    <button
                        key={filter}
                        onClick={() => onFilterChange(filter)}
                        className={`whitespace-nowrap px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                            currentFilter === filter
                                ? 'bg-burgundy text-white'
                                : 'bg-white text-gray-600 border border-gold/30 hover:border-burgundy'
                        }`}
                    >
                        {filter === 'All' ? 'All Wishes' : filter}
                    </button>
                ))}
            </div>
            <div className="shrink-0 flex items-center gap-2 bg-ivory px-4 py-1.5 rounded-full border border-gold/20 shadow-sm">
                <i className="fa-solid fa-envelope-open-text text-gold-dark text-sm"></i>
                <span className="text-sm font-semibold text-burgundy">
                    <span>{messageCount}</span> Messages
                </span>
            </div>
        </div>
    );
}
