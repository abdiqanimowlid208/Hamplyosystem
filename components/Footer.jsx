export default function Footer() {
    return (
        <footer className="w-full bg-[#fdfaf6] border-t border-gold/20 py-8 mt-auto z-10">
            <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <div className="font-playfair text-xl text-burgundy font-semibold italic">Hambalyo</div>
                <p>© 2026 Hambalyo Digital Stationery. Crafted with love.</p>
                <div className="flex gap-6">
                    <a href="#" className="hover:text-burgundy transition-colors">Privacy</a>
                    <a href="#" className="hover:text-burgundy transition-colors">Terms</a>
                    <a href="#" className="hover:text-burgundy transition-colors">Contact</a>
                </div>
            </div>
        </footer>
    );
}
