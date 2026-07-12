'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import supabaseClient from '@/lib/supabase';
import Header from '@/components/Header';
import MessageForm from '@/components/MessageForm';
import FilterBar from '@/components/FilterBar';
import MessageCard from '@/components/MessageCard';
import CustomizeModal from '@/components/CustomizeModal';
import Toast from '@/components/Toast';
import Footer from '@/components/Footer';

const RELATIONSHIPS = ['Waalid', 'Walaal', 'Saaxiib', 'Qaraabo', 'Macallin', 'Jaar'];

const DEFAULT_MESSAGES = [
    { id: '1', name: "Aisha", relationship: "Saaxiib", message: "Wishing you both a lifetime of love and happiness. The ceremony was beautiful.", created_at: Date.now() - 100000 },
    { id: '2', name: "Hooyo & Aabo", relationship: "Waalid", message: "So proud of you both today. May your home be filled with peace and blessings.", created_at: Date.now() - 200000 },
    { id: '3', name: "Jamaal", relationship: "Walaal", message: "Congratulations to my wonderful sibling! I can't wait to see what the future holds for you both.", created_at: Date.now() - 300000 }
];

export default function WeddingWall() {
    const [messages, setMessages] = useState([]);
    const [currentFilter, setCurrentFilter] = useState('All');
    const [coupleNames, setCoupleNames] = useState('Muna & Axmed');
    const [isSupabase, setIsSupabase] = useState(false);
    const [modalOpen, setModalOpen] = useState(false);
    const [toast, setToast] = useState({ show: false, message: '', isError: false });
    const toastTimeoutRef = useRef(null);

    // Show toast helper
    const showToast = useCallback((message, isError = false) => {
        if (toastTimeoutRef.current) clearTimeout(toastTimeoutRef.current);
        setToast({ show: true, message, isError });
        toastTimeoutRef.current = setTimeout(() => {
            setToast(prev => ({ ...prev, show: false }));
        }, 3500);
    }, []);

    // Initialize
    useEffect(() => {
        async function init() {
            if (supabaseClient) {
                setIsSupabase(true);

                // Fetch couple names
                const { data: settingsData } = await supabaseClient
                    .from('settings')
                    .select('couple_names')
                    .eq('id', 1)
                    .single();
                if (settingsData?.couple_names) {
                    setCoupleNames(settingsData.couple_names);
                }

                // Fetch messages
                const { data: dbMessages } = await supabaseClient
                    .from('messages')
                    .select('*')
                    .order('created_at', { ascending: false });
                if (dbMessages && dbMessages.length > 0) {
                    setMessages(dbMessages.map(m => ({
                        ...m,
                        created_at: new Date(m.created_at).getTime()
                    })));
                }

                // Realtime: messages
                supabaseClient.channel('public:messages')
                    .on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'messages' }, payload => {
                        setMessages(prev => {
                            if (prev.find(m => m.id === payload.new.id)) return prev;
                            return [{
                                ...payload.new,
                                created_at: new Date(payload.new.created_at).getTime()
                            }, ...prev];
                        });
                    })
                    .subscribe();

                // Realtime: settings
                supabaseClient.channel('public:settings')
                    .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'settings' }, payload => {
                        if (payload.new.couple_names) {
                            setCoupleNames(payload.new.couple_names);
                        }
                    })
                    .subscribe();
            } else {
                // Local mode
                const savedNames = typeof window !== 'undefined'
                    ? localStorage.getItem('hambalyo_names') || 'Muna & Axmed'
                    : 'Muna & Axmed';
                setCoupleNames(savedNames);

                const savedMessages = typeof window !== 'undefined'
                    ? localStorage.getItem('hambalyo_messages')
                    : null;
                if (savedMessages) {
                    setMessages(JSON.parse(savedMessages));
                } else {
                    setMessages([...DEFAULT_MESSAGES]);
                    if (typeof window !== 'undefined') {
                        localStorage.setItem('hambalyo_messages', JSON.stringify(DEFAULT_MESSAGES));
                    }
                }
            }
        }
        init();
    }, []);

    // Submit handler
    const handleSubmit = async (name, relationship, message) => {
        const newMsg = { name, relationship, message };

        if (supabaseClient) {
            const { data, error } = await supabaseClient
                .from('messages')
                .insert([newMsg])
                .select()
                .single();
            if (error) {
                showToast("Failed to post message to database.", true);
                return false;
            }
            setMessages(prev => [{
                ...data,
                created_at: new Date(data.created_at).getTime()
            }, ...prev]);
        } else {
            newMsg.id = Date.now().toString();
            newMsg.created_at = Date.now();
            setMessages(prev => {
                const updated = [newMsg, ...prev];
                localStorage.setItem('hambalyo_messages', JSON.stringify(updated));
                return updated;
            });
        }

        showToast("Message posted beautifully! 🌹");
        return true;
    };

    // Save couple names
    const handleSaveCoupleNames = async (newName) => {
        if (supabaseClient) {
            const { error } = await supabaseClient
                .from('settings')
                .upsert({ id: 1, couple_names: newName });
            if (error) {
                showToast("Failed to update names in database.", true);
                return;
            }
        } else {
            localStorage.setItem('hambalyo_names', newName);
        }
        setCoupleNames(newName);
        showToast("Names updated beautifully! ✨");
        setModalOpen(false);
    };

    // Filter messages
    const sorted = [...messages].sort((a, b) => b.created_at - a.created_at);
    const filtered = currentFilter === 'All' ? sorted : sorted.filter(m => m.relationship === currentFilter);

    return (
        <div className="bg-pattern text-gray-800 min-h-screen flex flex-col font-inter selection:bg-gold-light selection:text-burgundy">
            <Header
                coupleNames={coupleNames}
                isSupabase={isSupabase}
                onOpenModal={() => setModalOpen(true)}
            />

            <main className="flex-grow max-w-7xl mx-auto w-full px-4 sm:px-6 py-8 flex flex-col lg:flex-row gap-8 lg:gap-10 relative z-10">
                {/* Left Column: Form */}
                <aside className="w-full lg:w-[35%] xl:w-[30%] shrink-0">
                    <MessageForm
                        relationships={RELATIONSHIPS}
                        onSubmit={handleSubmit}
                        showToast={showToast}
                    />
                </aside>

                {/* Right Column: Wall */}
                <section className="w-full lg:w-[65%] xl:w-[70%] flex flex-col">
                    <FilterBar
                        relationships={RELATIONSHIPS}
                        currentFilter={currentFilter}
                        onFilterChange={setCurrentFilter}
                        messageCount={filtered.length}
                    />

                    {filtered.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-20 text-center animate-fade-in w-full bg-card/50 rounded-xl border border-gold/10">
                            <div className="text-5xl mb-4 text-gold/50">🕯️</div>
                            <h3 className="font-playfair text-2xl text-burgundy mb-2">No wishes yet</h3>
                            <p className="text-gray-500 font-inter max-w-md">Be the first to write a beautiful wish for the happy couple.</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
                            {filtered.map((msg, index) => (
                                <MessageCard key={msg.id} message={msg} index={index} />
                            ))}
                        </div>
                    )}
                </section>
            </main>

            <Footer />

            <CustomizeModal
                isOpen={modalOpen}
                onClose={() => setModalOpen(false)}
                coupleNames={coupleNames}
                onSave={handleSaveCoupleNames}
            />

            <Toast
                show={toast.show}
                message={toast.message}
                isError={toast.isError}
            />
        </div>
    );
}
