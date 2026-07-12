'use client';

import { useState, useRef } from 'react';

export default function MessageForm({ relationships, onSubmit, showToast }) {
    const [selectedRelationship, setSelectedRelationship] = useState('');
    const [charLength, setCharLength] = useState(0);
    const [submitting, setSubmitting] = useState(false);
    const formRef = useRef(null);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRelationship) {
            showToast("Please select a relationship", true);
            return;
        }

        setSubmitting(true);

        const name = formRef.current.guestName.value.trim();
        const message = formRef.current.guestMessage.value.trim();

        const success = await onSubmit(name, selectedRelationship, message);

        if (success) {
            // Fire confetti
            if (typeof window !== 'undefined') {
                const confetti = (await import('canvas-confetti')).default;
                const count = 250;
                const defaults = {
                    origin: { y: 0.6 },
                    colors: ['#D4AF37', '#5C061E', '#FAF6F0', '#AA7C11', '#7D122D']
                };
                const fire = (particleRatio, opts) => {
                    confetti({ ...defaults, ...opts, particleCount: Math.floor(count * particleRatio) });
                };
                fire(0.25, { spread: 26, startVelocity: 55 });
                fire(0.2, { spread: 60 });
                fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
                fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
                fire(0.1, { spread: 120, startVelocity: 45 });
            }

            // Reset form
            formRef.current.reset();
            setSelectedRelationship('');
            setCharLength(0);
        }

        setSubmitting(false);
    };

    return (
        <div className="bg-card rounded-xl p-6 sm:p-8 card-ornament shadow-card-soft border border-gold/10 sticky top-8">
            <h2 className="font-playfair text-2xl text-burgundy mb-6">Leave a Message</h2>

            <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-5">
                {/* Name Input */}
                <div>
                    <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">Your Name</label>
                    <input
                        type="text"
                        name="guestName"
                        maxLength={40}
                        required
                        placeholder="e.g. Aisha"
                        className="w-full bg-ivory/50 border border-gold/30 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors placeholder:text-gray-400"
                    />
                </div>

                {/* Relationship Tags */}
                <div>
                    <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase mb-2">Relationship</label>
                    <div className="flex flex-wrap gap-2">
                        {relationships.map(rel => (
                            <button
                                key={rel}
                                type="button"
                                onClick={() => setSelectedRelationship(rel)}
                                className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                                    selectedRelationship === rel
                                        ? 'bg-burgundy text-white border-burgundy'
                                        : 'border-gold/30 bg-white text-gray-600 hover:border-burgundy hover:text-burgundy'
                                }`}
                            >
                                {rel}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Message Textarea */}
                <div>
                    <div className="flex justify-between mb-2">
                        <label className="block text-xs font-semibold tracking-wider text-gray-500 uppercase">Your Message</label>
                        <span className={`text-xs font-medium transition-colors ${charLength >= 290 ? 'text-red-500' : 'text-gray-400'}`}>
                            {charLength} / 300
                        </span>
                    </div>
                    <textarea
                        name="guestMessage"
                        maxLength={300}
                        required
                        placeholder="Share your wishes..."
                        rows={4}
                        onChange={(e) => setCharLength(e.target.value.length)}
                        className="w-full bg-ivory/50 border border-gold/30 rounded-md px-4 py-3 text-sm focus:outline-none focus:border-burgundy focus:ring-1 focus:ring-burgundy transition-colors placeholder:text-gray-400 resize-none"
                    />
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full bg-burgundy hover:bg-burgundy-light text-white font-medium py-3.5 px-4 rounded-md transition-all duration-300 shadow-md hover:shadow-glow-gold flex justify-center items-center gap-2 mt-2 group disabled:opacity-70"
                >
                    <span>Guri nabad iyo caano leh</span>
                    <span className="text-lg group-hover:scale-110 transition-transform">🌹</span>
                </button>
            </form>
        </div>
    );
}
