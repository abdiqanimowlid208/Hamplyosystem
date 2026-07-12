'use client';

export default function Header({ coupleNames, isSupabase, onOpenModal }) {
    return (
        <header className="w-full pt-10 pb-6 px-6 relative z-10 text-center">
            {/* Top Right Actions */}
            <div className="absolute top-6 right-6 flex flex-col sm:flex-row items-end sm:items-center gap-3 sm:gap-4">
                <div className="flex items-center gap-2 text-xs sm:text-sm font-medium text-burgundy-light bg-white/50 px-3 py-1.5 rounded-full border border-gold/30 shadow-sm backdrop-blur-sm">
                    <div className={`w-2 h-2 rounded-full ${isSupabase ? 'bg-green-500' : 'bg-yellow-500 pulse-dot'}`}></div>
                    <span>{isSupabase ? 'Live Sync (Supabase)' : 'Local Mode'}</span>
                </div>
                <button
                    onClick={onOpenModal}
                    className="text-xs sm:text-sm font-medium text-burgundy hover:text-burgundy-light transition-colors border border-burgundy/20 hover:border-burgundy/50 px-4 py-1.5 rounded-full bg-white/50 backdrop-blur-sm shadow-sm hover:shadow-md"
                >
                    <i className="fa-solid fa-pen-fancy mr-2"></i>Customize Lamaanaha
                </button>
            </div>

            <div className="max-w-4xl mx-auto mt-12 sm:mt-4">
                <div className="flex items-center justify-center gap-4 mb-2">
                    <i className="fa-solid fa-gem text-gold text-xs"></i>
                    <h1 className="font-playfair text-4xl sm:text-5xl md:text-6xl text-burgundy font-bold">
                        {coupleNames}
                    </h1>
                    <i className="fa-solid fa-gem text-gold text-xs"></i>
                </div>
                <p className="font-inter text-gray-600 text-base sm:text-lg md:text-xl font-light tracking-wide mt-2">
                    Leave a message for the happy couple
                </p>

                <nav className="mt-8 flex justify-center gap-6 sm:gap-8 font-inter text-xs sm:text-sm tracking-widest uppercase text-gray-500">
                    <a href="#" className="hover:text-burgundy transition-colors">Gallery</a>
                    <a href="#" className="hover:text-burgundy transition-colors">Story</a>
                    <a href="#" className="hover:text-burgundy transition-colors">Registry</a>
                </nav>
            </div>
        </header>
    );
}
