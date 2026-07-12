'use client';

export default function MessageCard({ message, index }) {
    const date = new Date(message.created_at).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
    });

    return (
        <div
            className="bg-card p-6 rounded-xl border border-gold/20 shadow-sm hover-lift animate-fade-in flex flex-col h-full relative overflow-hidden group"
            style={{ animationDelay: `${index * 0.05}s` }}
        >
            {/* Corner glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 bg-gold-light/20 rounded-full blur-xl group-hover:bg-gold-light/40 transition-colors pointer-events-none"></div>

            <div className="flex justify-between items-start mb-4 relative z-10">
                <span className="inline-block px-3 py-1 rounded-full bg-gold-light/40 text-burgundy text-xs font-semibold uppercase tracking-wider border border-gold/20">
                    {message.relationship}
                </span>
                <span className="text-xs text-gray-400 font-medium">{date}</span>
            </div>

            <p className="font-playfair text-lg text-gray-700 italic mb-6 flex-grow leading-relaxed relative z-10">
                &ldquo;{message.message}&rdquo;
            </p>

            <div className="flex items-center gap-3 mt-auto pt-4 border-t border-gold/10 relative z-10">
                <i className="fa-solid fa-feather text-gold text-sm transform -rotate-12"></i>
                <span className="font-inter font-medium text-burgundy">{message.name}</span>
            </div>
        </div>
    );
}
